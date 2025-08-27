<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DeliveryController;
use App\Http\Controllers\InventoryController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Delivery routes (Week 2)
Route::post('/predict-delivery-time', [DeliveryController::class, 'predict']);
Route::post('/predict-delivery-time-queue', [DeliveryController::class, 'predictWithQueue']);
Route::get('/delivery-result/{id}', [DeliveryController::class, 'getResult']);
Route::get('/deliveries', [DeliveryController::class, 'getAllDeliveries']);

// Inventory routes (Week 4 - Warehouse Management)
Route::prefix('inventory')->group(function () {
    Route::post('/scan', [InventoryController::class, 'scan']);
    Route::post('/bulk-scan', [InventoryController::class, 'bulkScan']);
    Route::get('/current', [InventoryController::class, 'getCurrentInventory']);
    Route::get('/movements', [InventoryController::class, 'getMovements']);
    Route::get('/analytics', [InventoryController::class, 'getAnalytics']);
});