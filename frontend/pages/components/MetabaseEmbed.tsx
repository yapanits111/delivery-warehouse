import { useState } from 'react';

interface MetabaseEmbedProps {
  dashboardId?: string;
  width?: string;
  height?: string;
}

export default function MetabaseEmbed({ 
  dashboardId = "13", 
  width = "100%", 
  height = "600px" 
}: MetabaseEmbedProps) {
  const [showEmbed, setShowEmbed] = useState(false);
  const [metabaseUrl, setMetabaseUrl] = useState('http://localhost:3001');

  const embedUrl = `${metabaseUrl}/public/dashboard/${dashboardId}`;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Metabase Analytics Dashboard</h2>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={metabaseUrl}
            onChange={(e) => setMetabaseUrl(e.target.value)}
            placeholder="Metabase URL"
            className="px-3 py-1 border border-gray-300 rounded text-sm"
          />
          <button
            onClick={() => setShowEmbed(!showEmbed)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            {showEmbed ? 'Hide Dashboard' : 'Show Dashboard'}
          </button>
        </div>
      </div>

      {showEmbed ? (
        <div className="border rounded-lg overflow-hidden">
          <iframe
            src={embedUrl}
            width={width}
            height={height}
            frameBorder="0"
            allowFullScreen
            className="w-full"
            title="Metabase Delivery Analytics Dashboard"
            onError={() => {
              console.error('Failed to load Metabase dashboard');
            }}
          />
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <div className="text-gray-500 mb-4">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Metabase Dashboard</h3>
          <p className="text-gray-600 mb-4">
            Click "Show Dashboard" to embed your Metabase delivery analytics dashboard
          </p>
          <div className="text-sm text-gray-500">
            <p>Dashboard URL: {embedUrl}</p>
            <p className="mt-1">Make sure Metabase is running and the dashboard is publicly accessible</p>
          </div>
        </div>
      )}

      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-2">Metabase Setup Instructions:</h4>
        <div className="text-sm text-blue-700 space-y-1">
          <p>1. Make sure Metabase is running (usually on port 3000)</p>
          <p>2. Create a dashboard with delivery analytics</p>
          <p>3. Make the dashboard public or embed-friendly</p>
          <p>4. Update the dashboard ID in the URL above</p>
          <p>5. Example metrics: Average delivery time, deliveries by location, fuel efficiency</p>
        </div>
      </div>
    </div>
  );
}
