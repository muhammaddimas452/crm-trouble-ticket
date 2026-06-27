package main

import (
	"os"
	"time"
	"trouble-ticket/config"
	"trouble-ticket/models"
	"trouble-ticket/routes"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func main() {
	config.ConnectDB()

	config.DB.AutoMigrate(
		&models.User{},
		&models.Ticket{},
		&models.TicketLog{},
		&models.TicketProgress{})

	startPendingTicketChecker()

	var count int64
	config.DB.Model(&models.User{}).Count(&count)
	if count == 0 {
		hashedPassword, _ := bcrypt.GenerateFromPassword([]byte("password123"), bcrypt.DefaultCost)
		defaultAdmin := models.User{
			Name:     "Admin CRM",
			Email:    "admin@crm.com",
			Password: string(hashedPassword),
			Role:     models.RoleAdmin,
		}
		config.DB.Create(&defaultAdmin)
	}

	r := gin.Default()

	routes.SetupRoutes(r)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	r.Run(":" + port)
}

func startPendingTicketChecker() {
	go func() {
		ticker := time.NewTicker(30 * time.Second)
		for range ticker.C {
			var tickets []models.Ticket
			now := time.Now()
			// Find all tickets that are Pending and their batas_pending has passed
			if err := config.DB.Where("insiden = ? AND batas_pending IS NOT NULL AND batas_pending <= ?", "Pending", now).Find(&tickets).Error; err == nil {
				for _, ticket := range tickets {
					// Revert status to On Going
					ticket.Insiden = "On Going"
					ticket.Status_Laporan = "In Progress"
					ticket.Batas_Pending = nil
					
					if err := config.DB.Save(&ticket).Error; err == nil {
						// Create a log entry
						config.DB.Create(&models.TicketLog{
							TicketID: ticket.ID,
							Action:   "AUTO_REVERT",
							User:     "System",
							Detail:   "Batas waktu pending telah terlewati. Status otomatis diubah kembali menjadi On Going.",
						})
						// Also create a ticket progress entry
						config.DB.Create(&models.TicketProgress{
							TicketID: ticket.ID,
							User:     "System",
							Progress: "Batas waktu pending telah terlewati. Status otomatis diubah kembali menjadi On Going.",
						})
						// Sync the latest progress to the ticket
						config.DB.Model(&models.Ticket{}).Where("id = ?", ticket.ID).Update("update_progress", "Batas waktu pending telah terlewati. Status otomatis diubah kembali menjadi On Going.")
					}
				}
			}
		}
	}()
}
