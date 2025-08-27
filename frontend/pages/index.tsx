import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Logistics Dashboard
        </h1>
        
        <div className="space-y-4">
          <Link
            href="/predict"
            className="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            🚚 Delivery Time Predictor
            <div className="text-sm opacity-90">Week 2 - AI Microservice</div>
          </Link>

          <Link
            href="/analytics"
            className="block w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            📊 Delivery Analytics Dashboard
            <div className="text-sm opacity-90">Week 2 - Analytics & Visualization</div>
          </Link>
          
          <Link
            href="/warehouse"
            className="block w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            📦 Warehouse Dashboard
            <div className="text-sm opacity-90">Week 4 - Inventory Management</div>
          </Link>
        </div>

        <div className="mt-8 p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Available Services</h2>
          <div className="text-sm text-gray-600 space-y-1">
            <div>• Laravel Backend (Port 8000)</div>
            <div>• Flask AI Service (Port 5000)</div>
            <div>• Flask Warehouse Service (Port 5001)</div>
            <div>• PostgreSQL Database</div>
            <div>• Redis Queue</div>
          </div>
        </div>
      </div>
    </div>
  );
}
