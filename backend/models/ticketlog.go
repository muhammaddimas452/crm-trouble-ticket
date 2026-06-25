package models

import "gorm.io/gorm"

type TicketLog struct {
	gorm.Model

	TicketID uint   `json:"ticket_id"`
	Action   string `json:"action"` // CREATE, UPDATE, ASSIGN, CLOSE
	User     string `json:"user"`   // Nama user atau email
	Detail   string `json:"detail"` // Deskripsi perubahan
}
