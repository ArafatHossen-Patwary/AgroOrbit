# AgroOrbit

NASA Space Apps Challenge 2026 — **Field Shift: Adapting Farms with NASA Data**

Separate frontend and backend projects. No dashboard or NASA integration in this scaffold.

```
agroorbit/
├── frontend/   # React + Vite + Tailwind
└── backend/    # Laravel REST API + MySQL
```

## Prerequisites

- Node.js 20+
- PHP 8.3+
- Composer
- MySQL 8+

## 1. MySQL database

```bash
# Start MySQL (Ubuntu)
sudo service mysql start

# Create the database (adjust user/password as needed)
sudo mysql -e "CREATE DATABASE IF NOT EXISTS agroorbit CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

Update credentials in `backend/.env` if your MySQL user/password differ:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=agroorbit
DB_USERNAME=root
DB_PASSWORD=
```

Then run migrations:

```bash
cd backend
php artisan migrate
```

## 2. Backend (Laravel)

```bash
cd backend
composer install
cp .env.example .env   # skip if .env already exists
php artisan key:generate
php artisan serve
```

API will be at `http://127.0.0.1:8000`.

Health check:

```bash
curl http://127.0.0.1:8000/api/health
```

## 3. Frontend (React + Vite)

In a second terminal:

```bash
cd frontend
npm install
cp .env.example .env   # skip if .env already exists
npm run dev
```

App will be at `http://localhost:5173`.

The home page calls `GET /api/health` via Axios to verify CORS and connectivity.

## 4. Verify CORS

With both servers running, open `http://localhost:5173`. You should see a successful API response.

Or test CORS headers directly:

```bash
curl -i -H "Origin: http://localhost:5173" \
  -H "Access-Control-Request-Method: GET" \
  -X OPTIONS http://127.0.0.1:8000/api/health
```

CORS is configured in `backend/config/cors.php` for:

- `http://localhost:5173`
- `http://127.0.0.1:5173`

## Stack

**Frontend:** React, Vite, Tailwind CSS, React Router, Axios, Lucide React, Framer Motion, Recharts, React Leaflet

**Backend:** PHP 8+, Laravel, MySQL, REST API (`routes/api.php`)
