# 📚 **CENDEKIA**
![Desain tanpa judul (6)](https://github.com/user-attachments/assets/45a6f1b3-9d05-4964-9ee8-09ca00b60718)

## 🚀 **Tentang Proyek**
Proyek ini adalah aplikasi web Fullstack CMS(Content Management System) untuk Sistem Perpustakaan dengan dilengkapi fitur Denda dan proses pembayarannya.

## 🛠️ **Tech Stack**
- **Laravel**: Backend API & Logika Bisnis
- **React**: Frontend Interaktif
- **InertiaJS**: Integrasi Laravel dan React
- **TailwindCSS**: Styling Responsif
- **Spatie Laravel Permission**: Manajemen Role dan Permission
- **Midtrans**: Integrasi Pembayaran Denda
- **ShadcnUI**: Komponen UI Modern
- **DataTable**: Tabel Dinamis
- **Prettier**: Formatter Kode
- **Recharts**: Visualisasi Data
- **SSR (Server-Side Rendering)**: Rendering di Server
- **Mode Gelap (Dark Mode)**: Tema Gelap untuk Pengguna

## 📥 **Instalasi Proyek**

### **1. Clone Repository**
```bash
https://github.com/alawii17/website-perpustakaan-cendekia.git
```
```bash
cd website-perpustakaan-cendekia
```

### **2. Instal Dependensi Backend (Laravel)**
```bash
composer install
```
```bash
cp .env.example .env
```
```bash
php artisan key:generate
```

### **3. Instal Dependensi Frontend (React)**
```bash
npm install
```

### **4. Migrasi Database**
```bash
php artisan migrate --seed
```

### **5. Konfigurasi Midtrans**
Tambahkan konfigurasi berikut di file `.env`:
```
MIDTRANS_SERVER_KEY=your_server_key
MIDTRANS_CLIENT_KEY=your_client_key
```

### **6. Jalankan Aplikasi**
**Backend:**
```bash
php artisan serve
```
**Frontend:**
```bash
npm run dev
```

Akses aplikasi di: [http://localhost:8000](http://localhost:8000)

## 🔑 **Fitur Utama**
1. **Autentikasi & Manajemen Role (Spatie)**
2. **Responsif UI dengan TailwindCSS**
3. **Pembayaran dengan Midtrans**
4. **Mode Gelap (Dark Mode)**
5. **Visualisasi Data dengan Recharts**
6. **Pengelolaan Role & Permission**

## ✅ **Best Practices**
- Gunakan **Prettier** untuk memformat kode.
- Pastikan migrasi database selalu di-update.

Terima kasih! 🚀✨
