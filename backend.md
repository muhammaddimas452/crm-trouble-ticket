## 1. Berkas Backend (Go)

### A. [backend/config/database.go](file://wsl.localhost/Ubuntu/home/fadlan/crm-trouble-ticket/backend/config/database.go)
* **Sebelum Perubahan**:
  DSN ditulis statis (*hardcoded*) mengarah ke MySQL lokal di localhost tanpa env-vars.
  ```go
  func ConnectDB() {
      dsn := "root:@tcp(127.0.0.1:3306)/t_crm?charset=utf8mb4&parseTime=True&loc=Local"
      var err error
      DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
      if err != nil {
          log.Fatal("Gagal konek database", err)
      }
  }
  ```
* **Sesudah Perubahan**:
  Membaca DSN dari env variable docker, serta menyertakan logika *loop retry* koneksi 10 kali agar backend tidak langsung mati jika MySQL belum sepenuhnya menyala saat startup.
  ```go
  func ConnectDB() {
      dbUser := os.Getenv("DB_USER")
      if dbUser == "" { dbUser = "root" }
      dbPassword := os.Getenv("DB_PASSWORD")
      dbHost := os.Getenv("DB_HOST")
      if dbHost == "" { dbHost = "127.0.0.1" }
      dbPort := os.Getenv("DB_PORT")
      if dbPort == "" { dbPort = "3306" }
      dbName := os.Getenv("DB_NAME")
      if dbName == "" { dbName = "t_crm" }

      dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local", dbUser, dbPassword, dbHost, dbPort, dbName)

      var err error
      for i := 0; i < 10; i++ {
          DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
          if err == nil {
              log.Println("Database terhubung sukses!")
              return
          }
          log.Printf("Gagal konek database (percobaan %d): %v. Mencoba lagi...", i+1, err)
          time.Sleep(3 * time.Second)
      }
      log.Fatal("Gagal konek database setelah beberapa percobaan: ", err)
  }
  ```

---

### B. [backend/middleware/jwt.go](file://wsl.localhost/Ubuntu/home/fadlan/crm-trouble-ticket/backend/middleware/jwt.go)
* **Sebelum Perubahan**:
  Kunci rahasia JWT ditulis secara statis.
  ```go
  var jwtKey = []byte("secret-key-anda")
  ```
* **Sesudah Perubahan**:
  Membaca kunci rahasia secara dinamis dari environment variable `JWT_SECRET`.
  ```go
  func getJWTKey() []byte {
      secret := os.Getenv("JWT_SECRET")
      if secret == "" {
          return []byte("secret-key-anda")
      }
      return []byte(secret)
  }
  ```

---

### C. [backend/controllers/auth_controller.go](file://wsl.localhost/Ubuntu/home/fadlan/crm-trouble-ticket/backend/controllers/auth_controller.go)
* **Sebelum Perubahan**:
  Hanya terdapat method `Register` dan `Login`. Admin tidak dapat melakukan manajemen data user terdaftar.
* **Sesudah Perubahan**:
  Menambahkan method `GetUsers`, `GetUserByID`, dan `UpdateUser` dengan hash password opsional untuk keperluan pengeditan user.
  ```go
  func UpdateUser(c *gin.Context) {
      var user models.User
      id := c.Param("id")
      if err := config.DB.First(&user, id).Error; err != nil {
          c.JSON(http.StatusNotFound, gin.H{"message": "User tidak ditemukan"})
          return
      }

      type UpdateInput struct {
          Name     string `json:"name"`
          Email    string `json:"email"`
          Password string `json:"password"`
          Role     string `json:"role"`
      }

      var input UpdateInput
      c.ShouldBindJSON(&input)

      if input.Name != "" { user.Name = input.Name }
      if input.Email != "" { user.Email = input.Email }
      if input.Role != "" { user.Role = input.Role }
      if input.Password != "" {
          hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
          user.Password = string(hashedPassword)
      }

      config.DB.Save(&user)
      c.JSON(http.StatusOK, gin.H{"message": "Update user berhasil", "user": user})
  }
  ```

---

### D. [backend/routes/route.go](file://wsl.localhost/Ubuntu/home/fadlan/crm-trouble-ticket/backend/routes/route.go)
* **Sebelum Perubahan**:
  Tanpa CORS middleware global dan tidak memiliki route untuk manajemen user serta progres.
* **Sesudah Perubahan**:
  Mendaftarkan CORS middleware global dan route manajemen user serta progress.
  ```go
  func SetupRoutes(r *gin.Engine) {
      r.Use(CORSMiddleware())
      ...
      // User Management (Admin only)
      r.GET("/users", middleware.JWTAuth(), middleware.RequireRole("Admin"), controllers.GetUsers)
      r.GET("/users/:id", middleware.JWTAuth(), middleware.RequireRole("Admin"), controllers.GetUserByID)
      r.PUT("/users/:id", middleware.JWTAuth(), middleware.RequireRole("Admin"), controllers.UpdateUser)

      // Ticket Progress History
      r.GET("/tickets/:id/progress", middleware.JWTAuth(), middleware.RequireRole("Admin", "NOC"), controllers.GetProgressList)
      r.POST("/tickets/:id/progress", middleware.JWTAuth(), middleware.RequireRole("Admin", "NOC"), controllers.AddProgress)
  }
  ```

---

### E. [backend/cmd/main.go](file://wsl.localhost/Ubuntu/home/fadlan/crm-trouble-ticket/backend/cmd/main.go)
* **Sebelum Perubahan**:
  Server langsung berjalan di port `:8080`, tanpa otomatisasi check batas pending, dan tanpa seeding database.
* **Sesudah Perubahan**:
  Menjalankan Goroutine background worker pending-checker, melakukan auto-seeding data Admin awal, dan mendeteksi port dinamis dari environment.
  ```go
  func startPendingTicketChecker() {
      go func() {
          ticker := time.NewTicker(30 * time.Second)
          for range ticker.C {
              var tickets []models.Ticket
              now := time.Now()
              if err := config.DB.Where("insiden = ? AND batas_pending IS NOT NULL AND batas_pending <= ?", "Pending", now).Find(&tickets).Error; err == nil {
                  for _, ticket := range tickets {
                      ticket.Insiden = "On Going"
                      ticket.Status_Laporan = "In Progress"
                      ticket.Batas_Pending = nil
                      config.DB.Save(&ticket)
                  }
              }
          }
      }()
  }
  ```

---

### F. [backend/models/ticket.go](file://wsl.localhost/Ubuntu/home/fadlan/crm-trouble-ticket/backend/models/ticket.go)
* **Sebelum Perubahan**:
  Struct ticket tidak memiliki properti penampung data batas penangguhan (Pending).
  ```go
  type Ticket struct {
      gorm.Model
      No_Ticket      string    `json:"no_ticket" gorm:"column:nomer_tiket"`
      ...
      Update_Progress    string     `json:"update_progress"`
      Perbaikan_Gangguan string     `json:"perbaikan_gangguan"`
      Up_Time            *time.Time `json:"up_time"`
  }
  ```
* **Sesudah Perubahan**:
  Menambahkan properti struct `Batas_Pending`.
  ```go
  type Ticket struct {
      gorm.Model
      No_Ticket      string    `json:"no_ticket" gorm:"column:nomer_tiket"`
      ...
      Update_Progress    string     `json:"update_progress"`
      Perbaikan_Gangguan string     `json:"perbaikan_gangguan"`
      Up_Time            *time.Time `json:"up_time"`
      Batas_Pending      *time.Time `json:"batas_pending" gorm:"column:batas_pending"`
  }
  ```

---

### G. **[NEW]** [backend/models/ticket_progress.go](file://wsl.localhost/Ubuntu/home/fadlan/crm-trouble-ticket/backend/models/ticket_progress.go)
* **Sebelum Perubahan**: Berkas ini belum ada di repositori (baru dibuat).
* **Sesudah Perubahan**: Model baru untuk pencatatan logs progres.
  ```go
  package models
  import "gorm.io/gorm"

  type TicketProgress struct {
      gorm.Model
      TicketID uint   `json:"ticket_id"`
      User     string `json:"user"`
      Progress string `json:"progress"`
  }
  ```

---

### H. **[NEW]** [backend/controllers/progress_controllers.go](file://wsl.localhost/Ubuntu/home/fadlan/crm-trouble-ticket/backend/controllers/progress_controllers.go)
* **Sebelum Perubahan**: Berkas ini belum ada di repositori (baru dibuat).
* **Sesudah Perubahan**: Menampung fungsionalitas penambahan progres dan sinkronisasi ke data utama tiket.
  ```go
  func AddProgress(c *gin.Context) {
      ticketIDStr := c.Param("id")
      ticketID, _ := strconv.ParseUint(ticketIDStr, 10, 32)
      var input models.TicketProgress
      c.ShouldBindJSON(&input)
      input.TicketID = uint(ticketID)

      config.DB.Create(&input)
      config.DB.Model(&models.Ticket{}).Where("id = ?", ticketID).Update("update_progress", input.Progress)
      c.JSON(http.StatusCreated, input)
  }
  ```

---

### I. **[NEW]** [backend/Dockerfile](file://wsl.localhost/Ubuntu/home/fadlan/crm-trouble-ticket/backend/Dockerfile)
* **Sebelum Perubahan**: Berkas ini belum ada di repositori (baru dibuat).
* **Sesudah Perubahan**: File build Docker backend.
  ```dockerfile
  FROM golang:1.26-alpine AS builder
  WORKDIR /app
  COPY go.mod go.sum ./
  RUN go mod download
  COPY . .
  RUN CGO_ENABLED=0 GOOS=linux go build -o /app/server cmd/main.go

  FROM alpine:3.18
  WORKDIR /app
  COPY --from=builder /app/server /app/server
  EXPOSE 8080
  CMD ["/app/server"]
  ```

---