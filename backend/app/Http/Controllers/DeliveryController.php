<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Jobs\PredictDeliveryTime;
use App\Models\Delivery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class DeliveryController extends Controller
{
    public function predict(Request $request)
    {
        $request->validate([
            'distance_km' => 'required|numeric',
            'fuel_used' => 'required|numeric',
            'location' => 'string|nullable'
        ]);

        $data = $request->only('distance_km', 'fuel_used');

        try {
            $flaskUrl = env('ML_SERVICE_URL', 'http://127.0.0.1:5000');
            $response = Http::post($flaskUrl . '/predict', $data);
            
            if ($response->successful()) {
                // Store delivery record with prediction
                $delivery = Delivery::create([
                    'location' => $request->location ?? 'Unknown',
                    'distance_km' => $request->distance_km,
                    'fuel_used' => $request->fuel_used,
                    'time_minutes' => $response->json()['eta_minutes']
                ]);

                return response()->json([
                    'predicted_time' => $response->json()['eta_minutes'],
                    'delivery_id' => $delivery->id
                ]);
            } else {
                return response()->json(['error' => 'Flask service unavailable'], 503);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Connection to ML service failed'], 500);
        }
    }

    public function predictWithQueue(Request $request)
    {
        $request->validate([
            'distance_km' => 'required|numeric',
            'fuel_used' => 'required|numeric',
            'location' => 'string|nullable'
        ]);

        // Create delivery record
        $delivery = Delivery::create([
            'location' => $request->location ?? 'Unknown',
            'distance_km' => $request->distance_km,
            'fuel_used' => $request->fuel_used
        ]);

        // Dispatch job to queue
        PredictDeliveryTime::dispatch($delivery);

        return response()->json([
            'message' => 'Delivery prediction job dispatched',
            'delivery_id' => $delivery->id
        ]);
    }

    public function getResult($id)
    {
        $delivery = Delivery::find($id);
        
        if (!$delivery) {
            return response()->json(['error' => 'Delivery not found'], 404);
        }

        return response()->json([
            'delivery_id' => $delivery->id,
            'location' => $delivery->location,
            'distance_km' => $delivery->distance_km,
            'fuel_used' => $delivery->fuel_used,
            'predicted_time' => $delivery->time_minutes,
            'status' => $delivery->time_minutes ? 'completed' : 'processing',
            'created_at' => $delivery->created_at
        ]);
    }

    public function getAllDeliveries()
    {
        $deliveries = Delivery::orderBy('created_at', 'desc')->get();
        
        return response()->json([
            'deliveries' => $deliveries,
            'total' => $deliveries->count()
        ]);
    }
}
