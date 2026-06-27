# CRM Trouble Ticket

Sistem Manajemen CRM Trouble Ticket untuk mencatat, melacak, dan mengelola gangguan layanan pelanggan (insiden downtime). Aplikasi ini dibangun dengan arsitektur monorepo yang memisahkan Frontend dan Backend menggunakan Git Worktrees.

---

## 🚀 Fitur Utama

- **Autentikasi & Otorisasi**: Login berbasis JWT dengan pembagian role (Admin & NOC).
- **Manajemen Tiket**: Pembuatan tiket baru, pencatatan downtime/uptime, status laporan, layanan, lokasi, hingga PIC konfirmasi.
- **Riwayat Tiket (Logs)**: Pencatatan otomatis setiap aksi (`CREATE`, `UPDATE`, `ASSIGN`, `CLOSE`) beserta pengguna yang melakukan aksi tersebut.
- **Progres Tiket**: Kolaborasi real-time untuk pembaruan status perbaikan (*progress update*).
- **Dockerized**: Siap dijalankan di lingkungan lokal maupun produksi menggunakan Docker & Docker Compose.
- **Cloudflare Tunnel Integration**: Membuka jalur akses luar yang aman menggunakan Cloudflare Tunnel.

---

## 🛠️ Tech Stack

### Backend
- **Bahasa**: Go (v1.26.1)
- **Framework**: Gin Gonic (v1.12.0)
- **ORM**: GORM (v1.31.1)
- **Driver**: MySQL Driver (v1.6.0)
- **Autentikasi**: JWT (golang-jwt/v5)

### Frontend
- **Framework**: React (v19)
- **Bundler**: Vite (v8)
- **Styling**: TailwindCSS (v4)
- **Routing**: React Router DOM (v7)

### DevOps & Database
- **Database**: MySQL 8.0
- **Containerization**: Docker & Docker Compose
- **Secure Tunneling**: Cloudflare Tunnel (cloudflared)

---

## 📁 Struktur Proyek & Git Worktree

Proyek ini menggunakan metode **Git Worktree** untuk mengisolasi pengerjaan frontend dan backend pada branch terpisah di dalam satu direktori kerja:

- **Root / Branch `main`**: Berisi file orkestrasi (Docker Compose, README, dan konfigurasi lingkungan global).
- **Direktori `backend/`** (Branch `backend-crm`): Repositori backend berbasis Go.
- **Direktori `frontend/`** (Branch `frontend-crm`): Repositori frontend berbasis React + Vite.

### Struktur Direktori Utama
```text
crm-trouble-ticket/
├── backend/            # [Worktree: branch backend-crm]
│   ├── cmd/            # Entry point aplikasi Go (main.go)
│   ├── config/         # Konfigurasi database & koneksi
│   ├── controllers/    # Logika bisnis API
│   ├── middleware/     # JWT Auth middleware
│   ├── models/         # Defini tabel & skema database GORM
│   └── routes/         # Definisi endpoint API
├── frontend/           # [Worktree: branch frontend-crm]
│   ├── src/            # Kode utama React (components, pages, views)
│   ├── public/         # Aset statis frontend
│   └── nginx.conf      # Konfigurasi server Nginx untuk Docker
├── docker-compose.yml  # Orkestrasi container (MySQL, Backend, Frontend, Cloudflared)
├── README.md           # Dokumentasi proyek (file ini)
└── .gitignore          # Konfigurasi ignore file tingkat root
```

---

## ⚙️ Persiapan Lingkungan (.env)

Buat berkas `.env` di direktori root dengan mengacu pada variabel berikut:

```ini
# Database Config
DB_HOST=mysql
DB_PORT=3306
DB_USER=root
DB_PASSWORD=secret_password
DB_ROOT_PASSWORD=secret_root_password
DB_NAME=t_crm

# Backend Config
PORT=8080
JWT_SECRET=supersecretjwtkey

# Bind Hosts & Ports (Untuk Local Machine)
MYSQL_BIND_HOST=127.0.0.1
MYSQL_PORT=3306
BACKEND_BIND_HOST=127.0.0.1
BACKEND_PORT=8080
FRONTEND_BIND_HOST=127.0.0.1
FRONTEND_PORT=3000

# Cloudflare Tunnel Token
CLOUDFLARE_TUNNEL_TOKEN=your_cloudflare_tunnel_token_here
```

---

## 🏃 Cara Menjalankan Aplikasi

Anda dapat menjalankan aplikasi ini menggunakan dua cara:

### Opsi 1: Menggunakan Docker Compose (Direkomendasikan)

Pastikan Docker & Docker Compose sudah terpasang, lalu jalankan perintah berikut di direktori root:

```bash
docker-compose up --build -d
```

Aplikasi akan berjalan otomatis pada port-port berikut:
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend (API)**: [http://localhost:8080](http://localhost:8080)
- **MySQL Database**: `localhost:3306`

---

### Opsi 2: Menjalankan Secara Manual (Development Mode)

#### 1. Setup Database
- Pastikan MySQL server lokal Anda aktif.
- Buat database baru bernama `t_crm`.
- Import berkas database `trouble_ticket.sql` (jika tersedia).

#### 2. Jalankan Backend (Go)
1. Buka direktori `backend`:
   ```bash
   cd backend
   ```
2. Salin `.env.example` ke `.env` lalu sesuaikan konfigurasinya.
3. Jalankan server backend:
   ```bash
   go mod tidy
   go run ./cmd/main.go
   ```
4. Backend akan aktif di [http://localhost:8080](http://localhost:8080).

#### 3. Jalankan Frontend (React + Vite)
1. Buka direktori `frontend`:
   ```bash
   cd frontend
   ```
2. Pasang dependensi NodeJS:
   ```bash
   npm install
   ```
3. Jalankan development server:
   ```bash
   npm run dev
   ```
4. Frontend akan aktif di [http://localhost:5173](http://localhost:5173) (atau port lain yang ditunjuk oleh Vite).
