package controllers

import (
	"net/http"
	"time"

	"fmt"
	"trouble-ticket/config"
	"trouble-ticket/models"

	"github.com/gin-gonic/gin"
)

func CreateTicket(c *gin.Context) {
	var ticket models.Ticket

	if err := c.ShouldBindJSON(&ticket); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	var count int64
	config.DB.Model(&models.Ticket{}).Count(&count)

	ticket.No_Ticket = fmt.Sprintf(
		"TT-%s-%04d",
		time.Now().Format("20060102"),
		count+1,
	)

	if ticket.Tanggal_Ticket.IsZero() {
		ticket.Tanggal_Ticket = time.Now()

	}

	fmt.Println("No Ticket:", ticket.No_Ticket)
	fmt.Println("Tanggal Ticket:", ticket.Tanggal_Ticket)

	if err := config.DB.Create(&ticket).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	if err := config.DB.Create(&models.TicketLog{
		TicketID: ticket.ID,
		Action:   "CREATE",
		User:     ticket.Konfirmasi_PIC,
		Detail:   "Ticket berhasil dibuat",
	}).Error; err != nil {
		// Opsional: tulis log atau tangani error
	}

	c.JSON(http.StatusCreated, ticket)

}

func GetTickets(c *gin.Context) {
	var tickets []models.Ticket

	config.DB.Order("created_at DESC").Find(&tickets)

	c.JSON(http.StatusOK, tickets)
}

func GetTicketByID(c *gin.Context) {
	var ticket models.Ticket

	id := c.Param("id")

	if err := config.DB.First(&ticket, id).Error; err != nil {
		c.JSON(404, gin.H{
			"message": "Ticket tidak ditemukan",
		})
		return
	}

	c.JSON(200, ticket)
}

func UpdateTicket(c *gin.Context) {
	var ticket models.Ticket

	id := c.Param("id")

	if err := config.DB.First(&ticket, id).Error; err != nil {
		c.JSON(404, gin.H{
			"message": "Ticket tidak ditemukan",
		})
		return
	}

	var input models.Ticket
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	if err := config.DB.Model(&ticket).Updates(input).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	config.DB.First(&ticket, id)

	config.DB.Create(&models.TicketLog{
		TicketID: ticket.ID,
		Action:   "UPDATE_STATUS",
		User:     ticket.Konfirmasi_PIC,
		Detail:   "Data ticket diperbarui",
	})

	c.JSON(200, ticket)
}
func DeleteTicket(c *gin.Context) {
	var ticket models.Ticket

	id := c.Param("id")

	if err := config.DB.First(&ticket, id).Error; err != nil {
		c.JSON(404, gin.H{
			"message": "Ticket tidak ditemukan",
		})
		return
	}

	config.DB.Create(&models.TicketLog{
		TicketID: ticket.ID,
		Action:   "DELETE",
		User:     ticket.Konfirmasi_PIC,
		Detail:   "Ticket dihapus",
	})

	config.DB.Delete(&ticket)

	c.JSON(200, gin.H{
		"message": "Ticket berhasil dihapus",
	})
}

func SearchTickets(c *gin.Context) {
	var tickets []models.Ticket

	customer := c.Query("customer")
	statusLaporan := c.Query("status")
	noTicket := c.Query("no_ticket")

	query := config.DB.Model(&models.Ticket{})

	if customer != "" {
		query = query.Where("customer LIKE ?", "%"+customer+"%")
	}

	if statusLaporan != "" {
		query = query.Where("status_laporan = ?", statusLaporan)
	}

	if noTicket != "" {
		query = query.Where("nomer_tiket LIKE ?", "%"+noTicket+"%")
	}

	if err := query.Find(&tickets).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, tickets)
}

func GetTicketLogs(c *gin.Context) {
	var logs []models.TicketLog

	id := c.Param("id")

	if err := config.DB.
		Where("ticket_id = ?", id).
		Order("created_at DESC").
		Find(&logs).Error; err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, logs)
}
func CloseTicket(c *gin.Context) {
	var ticket models.Ticket

	if err := config.DB.First(&ticket, c.Param("id")).Error; err != nil {
		c.JSON(404, gin.H{
			"message": "Ticket tidak ditemukan",
		})
		return
	}

	now := time.Now()
	ticket.Tanggal_Close = &now
	ticket.Status_Laporan = "Closed"

	if err := config.DB.Save(&ticket).Error; err != nil {
		c.JSON(500, gin.H{
			"error": err.Error(),
		})
		return
	}

	config.DB.Create(&models.TicketLog{
		TicketID: ticket.ID,
		Action:   "CLOSE",
		User:     ticket.Konfirmasi_PIC,
		Detail:   "ticket ditutup",
	})

	c.JSON(200, gin.H{
		"message": "Ticket berhasil ditutup",
		"ticket":  ticket,
	})
}
