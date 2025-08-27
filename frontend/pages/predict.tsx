import React, { useState } from 'react';
import axios from 'axios';

interface Delivery {
  delivery_id: number;
  location: string;
  distance_km: number;
  fuel_used: number;
  predicted_time: number | null;
  created_at: string;
}

const PredictPage: React.FC = () => {
  const [location, setLocation] = useState('Makati');
  const [distance, setDistance] = useState(5);
  const [fuel, setFuel] = useState(1.5);
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recentDeliveries, setRecentDeliveries] = useState<Delivery[]>([]);

  // Metro Manila locations
  const metroManilaLocations = [
    'Makati', 'BGC', 'Quezon City', 'Mandaluyong', 'Pasig', 
    'Ortigas', 'Alabang', 'Manila', 'Antipolo', 'Marikina',
    'San Juan', 'Taguig', 'Paranaque', 'Las Pinas', 'Muntinlupa'
  ];

  const handleSubmit = async () => {
    if (distance <= 0 || fuel <= 0) {
      setError('Please enter valid distance and fuel values');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.post('http://localhost:5000/predict', {
        distance_km: distance,
        fuel_used: fuel,
      });
      
      setResult(response.data.eta_minutes);
      setError(null);
      
      // Add to recent deliveries
      const newDelivery: Delivery = {
        delivery_id: Date.now(),
        location: location,
        distance_km: distance,
        fuel_used: fuel,
        predicted_time: response.data.eta_minutes,
        created_at: new Date().toISOString()
      };
      
      setRecentDeliveries(prev => [newDelivery, ...prev].slice(0, 5));
      
    } catch (error: any) {
      setError('Flask AI service is not available. Make sure it is running on port 5000.');
      console.error('Prediction error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Week 2 - AI Delivery Predictor
              </h1>
              <p className="text-gray-600 mt-1">Metro Manila Delivery Time Estimation</p>
            </div>
            
            <div className="flex space-x-3">
              <button 
                onClick={() => window.location.href = '/'}
                className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 transition-all"
              >
                Home
              </button>
              <button 
                onClick={() => window.location.href = '/analytics'}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
              >
                Analytics
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Prediction Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6 border">
              <h2 className="text-xl font-bold text-gray-800 mb-6">AI Delivery Prediction</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Metro Manila Location
                  </label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                  >
                    {metroManilaLocations.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Distance (km)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={distance}
                        onChange={(e) => setDistance(Number(e.target.value))}
                        min="0.1"
                        step="0.1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <span className="text-gray-500 text-sm">km</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fuel Used (liters)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={fuel}
                        onChange={(e) => setFuel(Number(e.target.value))}
                        min="0.1"
                        step="0.1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <span className="text-gray-500 text-sm">L</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading || distance <= 0 || fuel <= 0}
                  className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-all disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Predicting...
                    </div>
                  ) : (
                    'Predict Delivery Time'
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Results Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Results */}
            <div className="bg-white rounded-xl shadow-lg p-6 border">
              <h3 className="text-lg font-bold text-gray-800 mb-4">AI Results</h3>

              {error && (
                <div className="bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-lg mb-4">
                  <span className="text-sm">{error}</span>
                </div>
              )}

              {result && (
                <div className="bg-green-100 border border-green-300 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-800 mb-2">
                    {result.toFixed(1)} min
                  </div>
                  <p className="text-sm text-green-700">Machine Learning Prediction</p>
                  <div className="mt-3 text-xs text-green-600 bg-green-50 p-2 rounded">
                    <div>{distance}km • {fuel}L • {location}</div>
                  </div>
                </div>
              )}

              {!result && !error && !loading && (
                <div className="text-center text-gray-500 py-6">
                  <p className="text-sm">Enter distance and fuel to get AI prediction</p>
                </div>
              )}
            </div>

            {/* Recent Deliveries */}
            <div className="bg-white rounded-xl shadow-lg p-6 border">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Predictions</h3>
              
              {recentDeliveries.length > 0 ? (
                <div className="space-y-3">
                  {recentDeliveries.slice(0, 4).map((delivery) => (
                    <div key={delivery.delivery_id} className="bg-gray-50 rounded-lg p-3 border">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-gray-800">{delivery.location}</span>
                        <span className="text-sm font-bold text-blue-600">{delivery.predicted_time?.toFixed(1)}min</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                        <div>{delivery.distance_km}km</div>
                        <div>{delivery.fuel_used}L</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-4">
                  <p className="text-sm">Make your first prediction!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictPage;
