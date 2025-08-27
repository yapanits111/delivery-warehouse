# Smart Warehouse & Delivery Analytics

## Overview
This repository contains two integrated projects:
- **Week 2: Delivery Analytics & AI Microservice**
- **Week 4: Smart Warehouse & Inventory Management with Barcode Scanning, Visualization via Metabase & Chart.js**

## Folder Structure
- `backend/` - Laravel backend for delivery and inventory APIs
- `flask_service/` - Flask microservice for barcode scanning and AI endpoints
- `frontend/` - Next.js frontend for dashboards and analytics
- `metabase/` - Metabase analytics setup

## Setup Instructions
1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/smart-warehouse-delivery-analytics.git
   cd smart-warehouse-delivery-analytics
   ```
2. **Install dependencies:**
   - Backend: `composer install`
   - Frontend: `npm install`
   - Flask: `pip install -r flask_service/requirements.txt`
3. **Set up PostgreSQL database:**
   - Run the SQL script in `flask_service/setup_postgres.sql` to create the `inventory` table.
   - Import `flask_service/inventory_data.csv` for sample data.
4. **Start services:**
   - Laravel: `php artisan serve`
   - Flask: `python flask_service/app.py`
   - Frontend: `npm run dev` in `frontend/`
   - Metabase: `docker-compose up` in `metabase/`
5. **Access dashboards:**
   - Delivery Analytics: `/analytics` (frontend)
   - Warehouse Analytics: `/warehouse` (frontend)
   - Metabase: `http://localhost:3001`

## Key Features
- Delivery prediction and analytics (Week 2)
- Inventory management and barcode scan simulation (Week 4)
- Data visualization with Metabase and Chart.js
- Sample/mock datasets for testing

## Documentation
- See `flask_service/README.md` for backend microservice details
- See `frontend/README.md` for frontend usage
- See `backend/README.md` for Laravel API details

## Authors
- Daniel Peñero

## License
MIT
