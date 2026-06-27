# Jurnal Lengkap Setiap Berkas Perubahan CRM Trouble Ticket (Sebelum vs Sesudah)

Dokumen ini memuat daftar **28 berkas (file)** yang dibuat baru maupun dimodifikasi selama pengerjaan integrasi sistem CRM Trouble Ticket sesuai dengan daftar *Git Review Changes* Anda, lengkap dengan rincian kode sebelum dan sesudah perubahan.

---

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

## 2. Berkas Frontend (React)

### A. [frontend/src/App.jsx](file://wsl.localhost/Ubuntu/home/fadlan/crm-trouble-ticket/frontend/src/App.jsx)
* **Sebelum Perubahan**: Hanya memuat route basic tanpa halaman Edit User.
  ```jsx
  <Router basename="/crm-trouble-ticket">
    <Routes>
      <Route path="/create-user" element={<CreateUser />} />
  ```
* **Sesudah Perubahan**: Mengubah basename dan menambahkan route `/edit-user/:id`.
  ```jsx
  <Router basename="/">
    <Routes>
      <Route path="/create-user" element={<CreateUser />} />
      <Route path="/edit-user/:id" element={<EditUser />} />
  ```

---

### B. [frontend/vite.config.js](file://wsl.localhost/Ubuntu/home/fadlan/crm-trouble-ticket/frontend/vite.config.js)
* **Sebelum Perubahan**: Konfigurasi Vite standard tanpa proxy.
  ```javascript
  export default defineConfig({
    base: "/",
    plugins: [react(), babel(), tailwindcss()],
  });
  ```
* **Sesudah Perubahan**: Menambahkan server proxy `/api` untuk penanganan port backend saat running dev mode.
  ```javascript
  export default defineConfig({
    base: "/",
    plugins: [react(), babel(), tailwindcss()],
    server: {
      port: 3000,
      proxy: {
        "/api": {
          target: "http://localhost:8080",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  });
  ```

---

### C. [frontend/src/utils/auth.js](file://wsl.localhost/Ubuntu/home/fadlan/crm-trouble-ticket/frontend/src/utils/auth.js)
* **Sebelum Perubahan**: Berkas ini belum ada di repositori (baru dibuat).
* **Sesudah Perubahan**: Logika utilitas token session auth.
  ```javascript
  export const getToken = () => localStorage.getItem("token");
  export const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  };
  export const loginUser = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };
  ```

---

### D. [frontend/src/utils/api.js](file://wsl.localhost/Ubuntu/home/fadlan/crm-trouble-ticket/frontend/src/utils/api.js)
* **Sebelum Perubahan**: Berkas ini belum ada di repositori (baru dibuat).
* **Sesudah Perubahan**: Wrapper Fetch API dengan pengiriman header Authorization JWT token secara terpusat.
  ```javascript
  import { getToken, logoutUser } from "./auth";
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
  // request handler custom
  ```

---

### E. [frontend/.env](file://wsl.localhost/Ubuntu/home/fadlan/crm-trouble-ticket/frontend/.env)
* **Sebelum Perubahan**: Berkas ini belum ada di repositori (baru dibuat).
* **Sesudah Perubahan**: Env-vars frontend menunjuk ke proxy path `/api`.
  ```env
  VITE_API_URL=/api
  ```

---

### F. [frontend/src/pages/Login.jsx](file://wsl.localhost/Ubuntu/home/fadlan/crm-trouble-ticket/frontend/src/pages/Login.jsx)
* **Sebelum Perubahan**: Login statis langsung mengarahkan ke dashboard admin.
  ```javascript
  const handleLogin = (e) => {
      e.preventDefault();
      navigate("/admin");
  };
  ```
* **Sesudah Perubahan**: Terintegrasi otentikasi API backend.
  ```javascript
  const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const data = await apiPost("/login", { email, password });
        loginUser(data.token, data.user);
        if (data.user.role === "Admin") { navigate("/admin"); } 
        else { navigate("/user-dashboard"); }
      } catch (err) { setError(err.message); }
  };
  ```

---

### G. [frontend/src/pages/AdminDashboard.jsx](file://wsl.localhost/Ubuntu/home/fadlan/crm-trouble-ticket/frontend/src/pages/AdminDashboard.jsx)
* **Sebelum Perubahan**: Donut chart dan grafik status diisi statis mockup.
  ```jsx
  <div className="relative w-24 h-24 border-t-green-500 border-r-green-500 border-b-orange-400 border-l-red-400 rounded-full">
  ```
* **Sesudah Perubahan**: Segmentasi donut chart dinamis menggunakan CSS `conic-gradient` berdasarkan persentase riil.
  ```javascript
  const closedPercentage = totalCount > 0 ? Math.round((closedCount / totalCount) * 100) : 0;
  const ongoingPercentage = totalCount > 0 ? Math.round((ongoingCount / totalCount) * 100) : 0;
  const pendingPercentage = totalCount > 0 ? Math.round((pendingCount / totalCount) * 100) : 0;
  ```
  ```jsx
  <div
    style={{
      background: totalCount > 0 
        ? `conic-gradient(#16a34a 0% ${closedPercentage}%, #ef4444 ${closedPercentage}% ${closedPercentage + ongoingPercentage}%, #f97316 ${closedPercentage + ongoingPercentage}% 100%)`
        : "#f3f4f6"
    }}
    className="relative w-24 h-24 rounded-full flex items-center justify-center"
  >
  ```

---

### H. [frontend/src/pages/UserDashboard.jsx](file://wsl.localhost/Ubuntu/home/fadlan/crm-trouble-ticket/frontend/src/pages/UserDashboard.jsx)
* **Sebelum Perubahan**: Isi tabel statis 5 baris mockup data Bank BCA, BNI, Mandiri.
* **Sesudah Perubahan**: Render dinamis berdasarkan state tickets dari API.
  ```jsx
  {tickets.map((t, index) => (
    <tr key={t.ID} className="hover:bg-gray-50/50 transition-colors">
      <td className="px-4 py-3">{index + 1}</td>
      <td className="px-4 py-3 font-bold">{t.no_ticket}</td>
      <td className="px-4 py-3 text-xs">{t.customer}</td>
      <td className="px-4 py-3 text-xs">{t.layanan}</td>
    </tr>
  ))}
  ```

---

### I. [frontend/src/pages/UpdateTicketList.jsx](file://wsl.localhost/Ubuntu/home/fadlan/crm-trouble-ticket/frontend/src/pages/UpdateTicketList.jsx)
* **Sebelum Perubahan**: Menampilkan data card statis tiket #123 dan #124.
* **Sesudah Perubahan**: Mengambil dinamis dari database tiket-tiket aktif.
  ```javascript
  const data = await apiGet("/tickets");
  const openTickets = data.filter((t) => t.status_laporan !== "Closed");
  setTickets(openTickets);
  ```

---

### J. [frontend/src/pages/UpdateTicketDetail.jsx](file://wsl.localhost/Ubuntu/home/fadlan/crm-trouble-ticket/frontend/src/pages/UpdateTicketDetail.jsx)
* **Sebelum Perubahan**: Form update tanpa gelembung log obrolan progres NOC.
* **Sesudah Perubahan**: Menampilkan riwayat progres log dinamis.
  ```jsx
  <div className="space-y-4">
    {progressList.map((p) => (
      <div key={p.ID} className="bg-gray-50 p-4 rounded-lg">
        <span className="font-bold">{p.user}</span>
        <p className="text-sm">{p.progress}</p>
      </div>
    ))}
  </div>
  ```

---

### K. [frontend/src/pages/OpenTicket.jsx](file://wsl.localhost/Ubuntu/home/fadlan/crm-trouble-ticket/frontend/src/pages/OpenTicket.jsx)
* **Sebelum Perubahan**: Field form statis tanpa value binding.
* **Sesudah Perubahan**: Bounded state values dan event onSubmit API post.
  ```javascript
  const payload = { customer, lokasi, layanan, device, insiden, update_progress: progress };
  await apiPost("/tickets", payload);
  ```

---

### L. [frontend/src/pages/UserList.jsx](file://wsl.localhost/Ubuntu/home/fadlan/crm-trouble-ticket/frontend/src/pages/UserList.jsx)
* **Sebelum Perubahan**: Hanya memetakan data statis "Budi".
* **Sesudah Perubahan**:
  ```jsx
  {users.map((u) => (
    <div key={u.ID} className="bg-white p-6 border rounded-xl">
      <h4>{u.name}</h4>
      <Link to={`/edit-user/${u.ID}`}>
        <button className="bg-[#007BFF]">Update</button>
      </Link>
    </div>
  ))}
  ```

---

### M. [frontend/src/pages/CreateUser.jsx](file://wsl.localhost/Ubuntu/home/fadlan/crm-trouble-ticket/frontend/src/pages/CreateUser.jsx)
* **Sebelum Perubahan**: Form statis pendaftaran user.
* **Sesudah Perubahan**: Menambahkan fungsi fetch post ke backend `/register` dengan validasi password cocok.

---

### N. **[NEW]** [frontend/src/pages/EditUser.jsx](file://wsl.localhost/Ubuntu/home/fadlan/crm-trouble-ticket/frontend/src/pages/EditUser.jsx)
* **Sebelum Perubahan**: Berkas ini belum ada di repositori (baru dibuat).
* **Sesudah Perubahan**: Halaman pengeditan informasi user (Admin).
  ```jsx
  export default function EditUser() {
    const { id } = useParams();
    // state name, email, role, password, load data user detail, put to API
  }
  ```

---

### O. [frontend/src/components/Layout.jsx](file://wsl.localhost/Ubuntu/home/fadlan/crm-trouble-ticket/frontend/src/components/Layout.jsx)
* **Sebelum Perubahan**: Sidebar statis yang selalu merender seluruh menu.
* **Sesudah Perubahan**: Menambahkan navigasi guard dan penyesuaian menu sidebar bersyarat berdasarkan role Admin.
  ```javascript
  const user = getUser();
  const adminPaths = ["/admin", "/users", "/create-user"];
  if (adminPaths.some(p => location.pathname.startsWith(p)) && user.role !== "Admin") {
      navigate("/user-dashboard");
  }
  ```

---

### P. **[NEW]** [frontend/nginx.conf](file://wsl.localhost/Ubuntu/home/fadlan/crm-trouble-ticket/frontend/nginx.conf)
* **Sebelum Perubahan**: Berkas ini belum ada di repositori (baru dibuat).
* **Sesudah Perubahan**: Routing proxy pass `/api/` di Nginx.
  ```nginx
  location /api/ {
      proxy_pass http://backend:8080/;
      proxy_set_header Host $host;
  }
  ```

---

### Q. **[NEW]** [frontend/Dockerfile](file://wsl.localhost/Ubuntu/home/fadlan/crm-trouble-ticket/frontend/Dockerfile)
* **Sebelum Perubahan**: Berkas ini belum ada di repositori (baru dibuat).
* **Sesudah Perubahan**: Build static assets Vite lalu dijalankan menggunakan runner image Nginx.

---

## 3. Berkas Konfigurasi Docker & Root Environment

### A. **[NEW]** [docker-compose.yml](file://wsl.localhost/Ubuntu/home/fadlan/crm-trouble-ticket/docker-compose.yml)
* **Sebelum Perubahan**: Berkas ini belum ada di repositori (baru dibuat).
* **Sesudah Perubahan**: Konfigurasi deployment kontainer multi-service (MySQL, Go Backend, React Frontend).

---

### B. **[NEW]** [.env](file://wsl.localhost/Ubuntu/home/fadlan/crm-trouble-ticket/.env) *(Berkas Root)*
* **Sebelum Perubahan**: Berkas ini belum ada di repositori (baru dibuat).
* **Sesudah Perubahan**: Kredensial rahasia DB, port aplikasi, dan JWT secret.
  ```env
  DB_HOST=mysql
  DB_PORT=3306
  DB_USER=crm_user
  DB_PASSWORD=crm_password
  DB_NAME=t_crm
  DB_ROOT_PASSWORD=root_password
  PORT=8080
  JWT_SECRET=secret-key-super-aman-crm-trouble-ticket-2026
  ```
