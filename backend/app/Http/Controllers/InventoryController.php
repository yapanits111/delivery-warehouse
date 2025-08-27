<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Models\Inventory;

class InventoryController extends Controller
{
    /**
     * Handle barcode/RFID scanning
     */
    public function scan(Request $request)
    {
        try {
            $request->validate([
                'sku' => 'required|string|max:50',
                'product_name' => 'required|string|max:255',
                'quantity' => 'required|integer|min:1',
                'status' => 'required|in:IN,OUT'
            ]);

            $data = $request->only(['sku', 'product_name', 'quantity', 'status']);

            // Send to Flask microservice
            $response = Http::timeout(10)->post('http://127.0.0.1:5001/rfid-scan', $data);

            if ($response->successful()) {
                $result = $response->json();
                
                Log::info('Inventory scan successful', [
                    'sku' => $data['sku'],
                    'status' => $data['status'],
                    'quantity' => $data['quantity']
                ]);

                return response()->json([
                    'success' => true,
                    'message' => 'Item scanned successfully',
                    'data' => $result['data'] ?? null
                ]);
            } else {
                Log::error('Flask service error', [
                    'status' => $response->status(),
                    'body' => $response->body()
                ]);

                return response()->json([
                    'success' => false,
                    'message' => 'Failed to process scan'
                ], 500);
            }
        } catch (\Exception $e) {
            Log::error('Inventory scan error: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Internal server error'
            ], 500);
        }
    }

    /**
     * Get current inventory status
     */
    public function getCurrentInventory()
    {
        try {
            $response = Http::timeout(10)->get('http://127.0.0.1:5001/inventory');

            if ($response->successful()) {
                return response()->json($response->json());
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to fetch inventory'
                ], 500);
            }
        } catch (\Exception $e) {
            Log::error('Get inventory error: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Internal server error'
            ], 500);
        }
    }

    /**
     * Get inventory movements for analytics
     */
    public function getMovements(Request $request)
    {
        try {
            $limit = $request->get('limit', 100);
            $days = $request->get('days', 30);

            $response = Http::timeout(10)->get('http://127.0.0.1:5001/inventory/movements', [
                'limit' => $limit,
                'days' => $days
            ]);

            if ($response->successful()) {
                return response()->json($response->json());
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to fetch movements'
                ], 500);
            }
        } catch (\Exception $e) {
            Log::error('Get movements error: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Internal server error'
            ], 500);
        }
    }

    /**
     * Get analytics data for dashboard
     */
    public function getAnalytics()
    {
        try {
            $response = Http::timeout(10)->get('http://127.0.0.1:5001/inventory/analytics');

            if ($response->successful()) {
                return response()->json($response->json());
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to fetch analytics'
                ], 500);
            }
        } catch (\Exception $e) {
            Log::error('Get analytics error: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Internal server error'
            ], 500);
        }
    }

    /**
     * Bulk scan items from CSV upload
     */
    public function bulkScan(Request $request)
    {
        try {
            $request->validate([
                'csv_file' => 'required|file|mimes:csv,txt'
            ]);

            $file = $request->file('csv_file');
            $csvData = array_map('str_getcsv', file($file));
            $header = array_shift($csvData);

            $processed = 0;
            $errors = [];

            foreach ($csvData as $index => $row) {
                if (count($row) < 4) {
                    $errors[] = "Row " . ($index + 2) . ": Insufficient data";
                    continue;
                }

                $data = [
                    'sku' => $row[0],
                    'product_name' => $row[1],
                    'quantity' => (int)$row[2],
                    'status' => strtoupper($row[3])
                ];

                if (!in_array($data['status'], ['IN', 'OUT'])) {
                    $errors[] = "Row " . ($index + 2) . ": Invalid status";
                    continue;
                }

                $response = Http::post('http://127.0.0.1:5001/rfid-scan', $data);
                
                if ($response->successful()) {
                    $processed++;
                } else {
                    $errors[] = "Row " . ($index + 2) . ": Processing failed";
                }
            }

            return response()->json([
                'success' => true,
                'message' => "Processed $processed items",
                'processed' => $processed,
                'errors' => $errors
            ]);

        } catch (\Exception $e) {
            Log::error('Bulk scan error: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Bulk scan failed'
            ], 500);
        }
    }
}
