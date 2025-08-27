# Week 2: Data Analytics & AI Microservice

## Overview
This project integrates Laravel (backend), Next.js (frontend), Flask (AI microservice), PostgreSQL (database), Redis (queue), and Metabase (analytics).

## Architecture
- **Laravel**: REST API, connects to PostgreSQL, uses Redis for queueing jobs.
- **Flask**: ML model for delivery time prediction, exposes `/predict` endpoint.
- **Next.js**: Frontend for delivery time prediction.
- **Metabase**: Analytics dashboard connected to PostgreSQL.

## Setup Instructions
### 1. PostgreSQL
- Install PostgreSQL
- Create database:
  ```sql
  CREATE DATABASE logistics_db;
  ```
- Update Laravel `.env`:
  ```env
  DB_CONNECTION=pgsql
  DB_HOST=127.0.0.1
  DB_PORT=5432
  DB_DATABASE=logistics_db
  DB_USERNAME=postgres
  DB_PASSWORD=yourpassword
  ```

### 2. Laravel Backend
- Install dependencies:
  ```sh
  composer install
  composer require laravel/sanctum predis/predis
  php artisan migrate
  ```
- API endpoint: `/api/predict-delivery-time`
- Queue worker:
  ```sh
  php artisan queue:work
  ```

### 3. Flask Microservice
- Install dependencies:
  ```sh
  pip install flask flask-cors pandas scikit-learn redis rq
  ```
- Run Flask app:
  ```sh
  python app.py
  ```
- Endpoint: `POST /predict`

### 4. Next.js Frontend
- Install dependencies:
  ```sh
  npm install
  npm install axios swr
  ```
- Run frontend:
  ```sh
  npm run dev
  ```

### 5. Metabase
- Download and run Metabase
- Connect to PostgreSQL
- Build dashboards

## API Example
**Flask:**
```
POST /predict
{
  "distance_km": 5,
  "fuel_used": 1.2
}
Response: { "eta_minutes": 17.4 }
```

**Laravel:**
```
POST /api/predict-delivery-time
{
  "distance_km": 5,
  "fuel_used": 1.2
}
Response: { "predicted_time": 17.4 }
```

## Testing
- Use Postman for API requests
- Check Metabase dashboards

## Folder Structure
- backend/ (Laravel)
- flask_service/ (Flask)
- frontend/ (Next.js)
- metabase/ (Metabase configs)

---
