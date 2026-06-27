package models

import "gorm.io/gorm"

type TicketProgress struct {
	gorm.Model
	TicketID uint   `json:"ticket_id" gorm:"index"`
	User     string `json:"user"`
	Progress string `json:"progress"`
}
