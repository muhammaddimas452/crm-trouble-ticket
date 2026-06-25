package routes

import (
	"trouble-ticket/controllers"
	"trouble-ticket/middleware"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {

	// Home
	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Backend Trouble Ticket Berhasil",
		})
	})

	// Authentication
	r.POST("/register", controllers.Register)
	r.POST("/login", controllers.Login)

	// admin dan NOC
	// Dashboard
	r.GET("/dashboard",
		middleware.JWTAuth(),
		middleware.RequireRole("Admin", "NOC"),
		controllers.GetDashboard,
	)

	// Ticket CRUD
	r.POST("/tickets",
		middleware.JWTAuth(),
		middleware.RequireRole("Admin", "NOC"),
		controllers.CreateTicket,
	)

	r.GET("/tickets",
		middleware.JWTAuth(),
		middleware.RequireRole("Admin", "NOC"),
		controllers.GetTickets,
	)

	r.GET("/tickets/:id",
		middleware.JWTAuth(),
		middleware.RequireRole("Admin", "NOC"),
		controllers.GetTicketByID,
	)

	r.PUT("/tickets/:id",
		middleware.JWTAuth(),
		middleware.RequireRole("Admin", "NOC"),
		controllers.UpdateTicket,
	)

	//hanya admin
	r.DELETE("/tickets/:id",
		middleware.JWTAuth(),
		middleware.RequireRole("Admin"),
		controllers.DeleteTicket,
	)

	// Search Ticket
	r.GET("/ticket/search",
		middleware.JWTAuth(),
		middleware.RequireRole("Admin", "NOC"),
		controllers.SearchTickets,
	)

	// Close Ticket
	r.PATCH("/tickets/:id/close",
		middleware.JWTAuth(),
		middleware.RequireRole("Admin", "NOC"),
		controllers.CloseTicket,
	)

	// Ticket Logs
	r.GET("/tickets/:id/logs",
		middleware.JWTAuth(),
		middleware.RequireRole("Admin", "NOC"),
		controllers.GetTicketLogs,
	)
}
