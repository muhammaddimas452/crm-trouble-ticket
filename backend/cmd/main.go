package main

import (
	"trouble-ticket/config"
	"trouble-ticket/models"
	"trouble-ticket/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	config.ConnectDB()

	config.DB.AutoMigrate(
		&models.User{},
		&models.Ticket{},
		&models.TicketLog{})

	r := gin.Default()

	routes.SetupRoutes(r)

	r.Run(":8080")
}
