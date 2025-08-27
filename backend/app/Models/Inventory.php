<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    use HasFactory;

    protected $table = 'inventory';

    protected $fillable = [
        'sku',
        'product_name',
        'quantity',
        'last_scanned',
        'status'
    ];

    protected $casts = [
        'last_scanned' => 'datetime',
        'quantity' => 'integer'
    ];

    /**
     * Scope to get IN movements
     */
    public function scopeInbound($query)
    {
        return $query->where('status', 'IN');
    }

    /**
     * Scope to get OUT movements
     */
    public function scopeOutbound($query)
    {
        return $query->where('status', 'OUT');
    }

    /**
     * Scope to get movements for a specific SKU
     */
    public function scopeBySku($query, $sku)
    {
        return $query->where('sku', $sku);
    }

    /**
     * Scope to get recent movements
     */
    public function scopeRecent($query, $days = 30)
    {
        return $query->where('last_scanned', '>=', now()->subDays($days));
    }

    /**
     * Get current stock level for this SKU
     */
    public static function getCurrentStock($sku)
    {
        $inbound = self::where('sku', $sku)->where('status', 'IN')->sum('quantity');
        $outbound = self::where('sku', $sku)->where('status', 'OUT')->sum('quantity');
        
        return $inbound - $outbound;
    }

    /**
     * Get top moved SKUs
     */
    public static function getTopMovedSkus($limit = 10)
    {
        return self::selectRaw('sku, product_name, COUNT(*) as movement_count, SUM(quantity) as total_quantity')
            ->groupBy('sku', 'product_name')
            ->orderByDesc('movement_count')
            ->limit($limit)
            ->get();
    }

    /**
     * Get movement statistics
     */
    public static function getMovementStats($days = 30)
    {
        $inbound = self::where('status', 'IN')
            ->where('last_scanned', '>=', now()->subDays($days))
            ->sum('quantity');
            
        $outbound = self::where('status', 'OUT')
            ->where('last_scanned', '>=', now()->subDays($days))
            ->sum('quantity');

        return [
            'inbound' => $inbound,
            'outbound' => $outbound,
            'net' => $inbound - $outbound
        ];
    }
}
