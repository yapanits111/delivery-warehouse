import Link from 'next/link';
import React, { useState } from 'react';
import axios from 'axios';

// List of available SKUs and names
const availableProducts = [
  { sku: 'A1001', name: 'Widget Alpha' },
  { sku: 'A1002', name: 'Gadget Beta' },
  { sku: 'A1003', name: 'Tool Gamma' },
  { sku: 'A1004', name: 'Device Delta' },
  { sku: 'A1005', name: 'Part Epsilon' },
  { sku: 'ABC123', name: 'Widget' },
  { sku: 'XYZ789', name: 'Gadget' },
  { sku: 'LMN456', name: 'Thingamajig' }
];

export default function WarehouseDashboard() {
  const [scanForm, setScanForm] = useState({
    sku: '',
    product_name: '',
    quantity: 1,
    status: 'IN' as 'IN' | 'OUT'
  });

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    // You can add API call here to save scan to backend
    setScanForm({ sku: '', product_name: '', quantity: 1, status: 'IN' });
    alert('Item scanned!');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mb-4">
        <Link href="/">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Back to Home</button>
        </Link>
      </div>

      {/* List of available SKUs and names */}
      <div className="mb-6 bg-white p-4 rounded shadow max-w-lg mx-auto">
        <h3 className="text-lg font-semibold mb-2">Available Products</h3>
        <ul className="list-disc pl-5">
          {availableProducts.map(p => (
            <li key={p.sku}><strong>{p.sku}</strong>: {p.name}</li>
          ))}
        </ul>
      </div>
      {/* Scan Form UI */}
      <form onSubmit={handleScan} className="mb-8 bg-white p-4 rounded shadow max-w-lg mx-auto">
        <div className="mb-2">
          <label className="block mb-1">SKU</label>
          <input type="text" value={scanForm.sku} onChange={e => setScanForm({ ...scanForm, sku: e.target.value })} className="border px-2 py-1 w-full" required />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Product Name</label>
          <input type="text" value={scanForm.product_name} onChange={e => setScanForm({ ...scanForm, product_name: e.target.value })} className="border px-2 py-1 w-full" required />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Quantity</label>
          <input type="number" value={scanForm.quantity} min={1} onChange={e => setScanForm({ ...scanForm, quantity: Number(e.target.value) })} className="border px-2 py-1 w-full" required />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Status</label>
          <select value={scanForm.status} onChange={e => setScanForm({ ...scanForm, status: e.target.value as 'IN' | 'OUT' })} className="border px-2 py-1 w-full">
            <option value="IN">IN</option>
            <option value="OUT">OUT</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Scan Item</button>
      </form>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <iframe
          src="http://localhost:3001/public/dashboard/11a6de46-9c5b-4609-af1d-169592ed621e"
          width="100%"
          height="600"
          style={{ border: 'none' }}
        />
      </div>
    </div>
  );
}
