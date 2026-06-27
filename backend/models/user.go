package models

import "gorm.io/gorm"

const (
	RoleAdmin = "Admin"
	RoleNOC   = "NOC"
)

type User struct {
	gorm.Model

	Name     string `json:"name"`
	Email    string `json:"email" gorm:"unique;not null"`
	Password string `json:"password"`
	Role     string `json:"role" gorm:"default:NOC"`
}
