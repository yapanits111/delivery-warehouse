import requests
import random
from datetime import datetime

ENDPOINT = 'http://127.0.0.1:5001/rfid-scan'
SKUS = ['ABC123', 'XYZ789', 'LMN456']
PRODUCTS = ['Widget', 'Gadget', 'Thingamajig']

for _ in range(20):
    sku = random.choice(SKUS)
    product = random.choice(PRODUCTS)
    quantity = random.randint(1, 50)
    status = random.choice(['IN', 'OUT'])
    data = {
        'sku': sku,
        'product_name': product,
        'quantity': quantity,
        'status': status
    }
    r = requests.post(ENDPOINT, json=data)
    print(f"Sent: {data}, Response: {r.text}")
