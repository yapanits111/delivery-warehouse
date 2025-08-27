from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import redis
from rq import Queue
import numpy as np
import os
import psycopg2
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Redis queue (optional for this setup)
try:
    r = redis.Redis()
    q = Queue(connection=r)
    print("Redis connected successfully")
except:
    print("Redis not available, running without queue")
    r = None
    q = None

# Dummy ML model (linear regression for delivery time prediction)
def train_model():
    """Train a simple linear regression model for delivery time prediction"""
    from sklearn.linear_model import LinearRegression
    import numpy as np
    
    # Sample training data: [distance_km, fuel_used] -> time_minutes
    # Based on realistic logistics data
    X = np.array([
        [1, 1], [2, 2], [3, 1.5], [4, 3], [5, 2.5],
        [10, 4], [15, 6], [20, 8], [25, 10], [30, 12],
        [35, 14], [40, 16], [50, 20]
    ])
    y = np.array([10, 18, 22, 35, 28, 45, 65, 85, 105, 125, 145, 165, 205])
    
    model = LinearRegression().fit(X, y)
    joblib.dump(model, 'model.pkl')
    print("Model trained and saved successfully")
    return model

@app.route('/predict', methods=['POST'])
def predict():
    """Predict delivery time based on distance and fuel consumption"""
    try:
        data = request.json
        
        if not data or 'distance_km' not in data or 'fuel_used' not in data:
            return jsonify({'error': 'Missing required fields: distance_km, fuel_used'}), 400
        
        X = [[data['distance_km'], data['fuel_used']]]
        
        # Load or train model if it doesn't exist
        if not os.path.exists('model.pkl'):
            train_model()
        
        model = joblib.load('model.pkl')
        prediction = model.predict(X)[0]
        
        # Ensure minimum realistic time
        eta_minutes = max(5, round(prediction, 2))
        
        return jsonify({
            'eta_minutes': eta_minutes,
            'status': 'success'
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'service': 'delivery-prediction-ml',
        'redis_available': r is not None
    })

@app.route('/model-info', methods=['GET'])
def model_info():
    """Get information about the current model"""
    try:
        if os.path.exists('model.pkl'):
            model = joblib.load('model.pkl')
            return jsonify({
                'model_type': str(type(model).__name__),
                'features': ['distance_km', 'fuel_used'],
                'target': 'eta_minutes',
                'status': 'loaded'
            })
        else:
            return jsonify({
                'status': 'no_model',
                'message': 'Model will be trained on first prediction'
            })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    print("Starting Flask ML Service for Week 2 - Data Analytics & AI Microservice")
    train_model()  # Train model on startup
    app.run(debug=True, port=5000, host='0.0.0.0')


# Week 4: Smart Warehouse - Barcode Scanning Endpoint
@app.route('/rfid-scan', methods=['POST'])
def scan_barcode():
    data = request.json
    try:
        conn = psycopg2.connect(
            dbname="logistics_db",
            user="postgres",
            password="yourpassword",  # update as needed
            host="localhost",
            port="5432"
        )
        cur = conn.cursor()
        cur.execute("""
            INSERT INTO inventory (sku, product_name, quantity, last_scanned, status)
            VALUES (%s, %s, %s, %s, %s)
        """, (
            data['sku'],
            data['product_name'],
            data['quantity'],
            datetime.now(),
            data['status']
        ))
        conn.commit()
        cur.close()
        conn.close()
        return jsonify({"message": "Scanned successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
