package routes

import (
	"trouble-ticket/controllers"
	"trouble-ticket/middleware"

	"github.com/gin-gonic/gin"
)

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, PATCH, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func SetupRoutes(r *gin.Engine) {
	r.Use(CORSMiddleware())

	// Home
	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Backend Trouble Ticket Berhasil",
		})
	})

	// Authentication
	r.POST("/register", controllers.Register)
	r.POST("/login", controllers.Login)

	// User Management (Admin only)
	r.GET("/users",
		middleware.JWTAuth(),
		middleware.RequireRole("Admin"),
		controllers.GetUsers,
	)
	r.GET("/users/:id",
		middleware.JWTAuth(),
		middleware.RequireRole("Admin"),
		controllers.GetUserByID,
	)
	r.PUT("/users/:id",
		middleware.JWTAuth(),
		middleware.RequireRole("Admin"),
		controllers.UpdateUser,
	)

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

	// Ticket Progress History
	r.GET("/tickets/:id/progress",
		middleware.JWTAuth(),
		middleware.RequireRole("Admin", "NOC"),
		controllers.GetProgressList,
	)
	r.POST("/tickets/:id/progress",
		middleware.JWTAuth(),
		middleware.RequireRole("Admin", "NOC"),
		controllers.AddProgress,
	)
	r.PUT("/tickets/:id/progress/:progress_id",
		middleware.JWTAuth(),
		middleware.RequireRole("Admin", "NOC"),
		controllers.UpdateProgress,
	)
	r.DELETE("/tickets/:id/progress/:progress_id",
		middleware.JWTAuth(),
		middleware.RequireRole("Admin", "NOC"),
		controllers.DeleteProgress,
	)
}
