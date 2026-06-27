package controllers

import (
	"fmt"
	"net/http"

	"trouble-ticket/config"
	"trouble-ticket/models"

	"github.com/gin-gonic/gin"
)

func GetDashboard(c *gin.Context) {
	var total int64
	var open int64
	var inProgress int64
	var pending int64
	var resolved int64
	var closed int64

	config.DB.Model(&models.Ticket{}).Count(&total)

	config.DB.Model(&models.Ticket{}).
		Where("status_laporan = ?", "Open").
		Count(&open)

	config.DB.Model(&models.Ticket{}).
		Where("status_laporan = ?", "In Progress").
		Count(&inProgress)

	config.DB.Model(&models.Ticket{}).
		Where("status_laporan = ?", "Pending").
		Count(&pending)

	config.DB.Model(&models.Ticket{}).
		Where("status_laporan = ?", "Resolved").
		Count(&resolved)

	config.DB.Model(&models.Ticket{}).
		Where("status_laporan = ?", "Closed").
		Count(&closed)

	fmt.Println("Total:", total)
	fmt.Println("Open:", open)
	fmt.Println("In Progress:", inProgress)
	fmt.Println("Pending:", pending)
	fmt.Println("Resolved:", resolved)
	fmt.Println("Closed:", closed)

	c.JSON(http.StatusOK, gin.H{
		"total_ticket": total,
		"open":         open,
		"in_progress":  inProgress,
		"pending":      pending,
		"resolved":     resolved,
		"closed":       closed,
	})
}
