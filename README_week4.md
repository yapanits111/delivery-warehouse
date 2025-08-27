# Week 4: Smart Warehouse & Inventory Management

## Overview
Simulate a smart warehouse system with barcode scanning, inventory tracking, and analytics using Flask, Laravel, Next.js (Chart.js), PostgreSQL, and Metabase.

## Architecture
- **Flask**: `/rfid-scan` endpoint for barcode scanning, writes to PostgreSQL.
- **Laravel**: API integration with Flask, exposes inventory data.
- **Next.js**: Dashboard visualizations using Chart.js.
- **Metabase**: Analytics dashboard connected to PostgreSQL.

## Setup Instructions
### 1. Prepare Inventory Dataset
- Columns: SKU, Product Name, Quantity, Last Scanned, Status (IN/OUT)
- Save as `inventory_data.csv`

### 2. PostgreSQL
- Create table:
  ```sql
  CREATE TABLE inventory (
    id SERIAL PRIMARY KEY,
    sku VARCHAR(20),
    product_name TEXT,
    quantity INT,
    last_scanned TIMESTAMP,
    status VARCHAR(10)
  );
  ```

### 3. Flask Microservice
- Install dependencies:
  ```sh
  pip install flask psycopg2
  ```
- Run Flask app:
  ```sh
  python app.py
  ```
- Endpoint: `POST /rfid-scan`

### 4. Laravel API
- Use `Http::post('http://localhost:5001/rfid-scan', [...])` in controller

### 5. Next.js Dashboard
- Install Chart.js:
  ```sh
  npm install chart.js react-chartjs-2
  ```
- Run frontend:
  ```sh
  npm run dev
  ```

### 6. Metabase
- Connect to PostgreSQL
- Create dashboards (time series, pie chart, bar chart)

## API Example
**Flask:**
```
POST /rfid-scan
{
  "sku": "A123",
  "product_name": "Widget",
  "quantity": 10,
  "status": "IN"
}
Response: { "message": "Scanned successfully" }
```

## Testing
- Use Postman for API requests
- Check Metabase dashboards

## Folder Structure
- backend/ (Laravel)
- flask_service/ (Flask)
- frontend/ (Next.js)
- metabase/ (Metabase configs)
- inventory_data.csv

---
