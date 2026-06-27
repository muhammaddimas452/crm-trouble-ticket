package controllers

import (
	"net/http"
	"strconv"
	"trouble-ticket/config"
	"trouble-ticket/models"

	"github.com/gin-gonic/gin"
)

func GetProgressList(c *gin.Context) {
	ticketID := c.Param("id")
	var progressList []models.TicketProgress

	if err := config.DB.Where("ticket_id = ?", ticketID).Order("created_at ASC").Find(&progressList).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, progressList)
}

func AddProgress(c *gin.Context) {
	ticketIDStr := c.Param("id")
	ticketID, err := strconv.ParseUint(ticketIDStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ticket ID"})
		return
	}

	var input models.TicketProgress
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	input.TicketID = uint(ticketID)

	if err := config.DB.Create(&input).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Update the parent ticket's update_progress field with the latest progress
	config.DB.Model(&models.Ticket{}).Where("id = ?", ticketID).Update("update_progress", input.Progress)

	// Create a log entry
	config.DB.Create(&models.TicketLog{
		TicketID: uint(ticketID),
		Action:   "ADD_PROGRESS",
		User:     input.User,
		Detail:   "Progres baru ditambahkan: " + input.Progress,
	})

	c.JSON(http.StatusCreated, input)
}

func UpdateProgress(c *gin.Context) {
	progressID := c.Param("progress_id")
	var progress models.TicketProgress

	if err := config.DB.First(&progress, progressID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "Progress not found"})
		return
	}

	var input models.TicketProgress
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	progress.Progress = input.Progress
	if input.User != "" {
		progress.User = input.User
	}

	if err := config.DB.Save(&progress).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Sync the latest progress to ticket
	var latestProgress models.TicketProgress
	if err := config.DB.Where("ticket_id = ?", progress.TicketID).Order("created_at DESC").First(&latestProgress).Error; err == nil {
		config.DB.Model(&models.Ticket{}).Where("id = ?", progress.TicketID).Update("update_progress", latestProgress.Progress)
	}

	// Create a log entry
	config.DB.Create(&models.TicketLog{
		TicketID: progress.TicketID,
		Action:   "UPDATE_PROGRESS",
		User:     progress.User,
		Detail:   "Progres diperbarui: " + progress.Progress,
	})

	c.JSON(http.StatusOK, progress)
}

func DeleteProgress(c *gin.Context) {
	progressID := c.Param("progress_id")
	var progress models.TicketProgress

	if err := config.DB.First(&progress, progressID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "Progress not found"})
		return
	}

	ticketID := progress.TicketID

	if err := config.DB.Delete(&progress).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Sync the latest progress to ticket
	var latestProgress models.TicketProgress
	if err := config.DB.Where("ticket_id = ?", ticketID).Order("created_at DESC").First(&latestProgress).Error; err == nil {
		config.DB.Model(&models.Ticket{}).Where("id = ?", ticketID).Update("update_progress", latestProgress.Progress)
	} else {
		// If no progress entries left, set update_progress to empty string
		config.DB.Model(&models.Ticket{}).Where("id = ?", ticketID).Update("update_progress", "")
	}

	// Create a log entry
	config.DB.Create(&models.TicketLog{
		TicketID: ticketID,
		Action:   "DELETE_PROGRESS",
		User:     progress.User,
		Detail:   "Progres dihapus",
	})

	c.JSON(http.StatusOK, gin.H{"message": "Progress deleted successfully"})
}
