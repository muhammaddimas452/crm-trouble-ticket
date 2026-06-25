package models

import (
	"time"

	"gorm.io/gorm"
)

type Ticket struct {
	gorm.Model

	No_Ticket      string    `json:"no_ticket" gorm:"column:nomer_tiket"`
	Tanggal_Ticket time.Time `json:"tanggal_ticket" gorm:"column:tanggal_tiket_dibuat"`

	Customer  string     `json:"customer"`
	Lokasi    string     `json:"lokasi"`
	Device    string     `json:"device"`
	Layanan   string     `json:"layanan"`
	Down_Time *time.Time `json:"down_time"`

	Insiden            string     `json:"insiden"`
	Update_Progress    string     `json:"update_progress"`
	Perbaikan_Gangguan string     `json:"perbaikan_gangguan"`
	Up_Time            *time.Time `json:"up_time"`

	Status_Layanan string     `json:"status_layanan"`
	Konfirmasi_PIC string     `json:"konfirmasi_pic"`
	Status_Laporan string     `json:"status_laporan"`
	Tanggal_Close  *time.Time `json:"tanggal_close" gorm:"column:close_tiket"`
}

func (Ticket) TableName() string {
	return "ticket"
}
