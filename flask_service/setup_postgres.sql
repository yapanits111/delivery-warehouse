-- PostgreSQL setup script for inventory table
CREATE TABLE IF NOT EXISTS inventory (
    id SERIAL PRIMARY KEY,
    sku VARCHAR(20),
    product_name TEXT,
    quantity INT,
    last_scanned TIMESTAMP,
    status VARCHAR(10) -- IN or OUT
);
