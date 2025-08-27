export default function DeliveryAnalytics() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">Delivery Analytics Dashboard</h1>
            <div className="flex space-x-3">
              <button 
                onClick={() => window.location.href = '/'}
                className="text-gray-600 hover:text-gray-800 text-sm font-medium"
              >
                Home
              </button>
              <button 
                onClick={() => window.location.href = '/warehouse'}
                className="text-gray-600 hover:text-gray-800 text-sm font-medium"
              >
                Warehouse
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-4">Delivery Time Distribution</h2>
        <iframe
          src="http://localhost:3001/public/dashboard/0d8f3016-0599-4273-8bcd-df806aa8d57e"
          width="100%"
          height="600"
          style={{ border: 'none' }}
        />
      </div>
    </div>
  );
}