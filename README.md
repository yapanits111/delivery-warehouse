# Smart Warehouse & Delivery Analytics

## Overview
This repository contains two integrated projects:
- **Week 2: Delivery Analytics & AI Microservice**
<img width="1862" height="753" alt="Screenshot 2025-08-28 012810" src="https://github.com/user-attachments/assets/56c1cb25-5467-4ce5-b595-873d2752bafb" />
<img width="1819" height="886" alt="Screenshot 2025-08-28 012820" src="https://github.com/user-attachments/assets/106e7e75-61c5-4d1f-907c-5377f743abbf" />

- **Week 4: Smart Warehouse & Inventory Management with Barcode Scanning, Visualization via Metabase & Chart.js**
<img width="1867" height="884" alt="Screenshot 2025-08-28 030346" src="https://github.com/user-attachments/assets/84a328cc-e4c6-4cc1-9377-a058bffeac01" />
<img width="1838" height="894" alt="Screenshot 2025-08-28 030457" src="https://github.com/user-attachments/assets/ed24de1a-9174-432c-968b-42daf0375770" />




## Folder Structure
- `backend/` - Laravel backend for delivery and inventory APIs
- `flask_service/` - Flask microservice for barcode scanning and AI endpoints
- `frontend/` - Next.js frontend for dashboards and analytics
- `metabase/` - Metabase analytics setup

## Setup Instructions
1. **Clone the repository:**
   ```sh
   git clone https://github.com/yapanits111/delivery-warehouse.git
   cd delivery-warehouse
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
