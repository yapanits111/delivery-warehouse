<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;
use App\Models\Delivery;

class PredictDeliveryTime implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $delivery;

    public function __construct(Delivery $delivery)
    {
        $this->delivery = $delivery;
    }

    public function handle()
    {
        $data = [
            'distance_km' => $this->delivery->distance_km,
            'fuel_used' => $this->delivery->fuel_used
        ];

        $flaskUrl = env('ML_SERVICE_URL', 'http://127.0.0.1:5000');
        $response = Http::post($flaskUrl . '/predict', $data);

        $this->delivery->time_minutes = $response['eta_minutes'];
        $this->delivery->save();
    }
}
