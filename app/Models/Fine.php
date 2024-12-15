<?php

namespace App\Models;

use App\Enums\FinePaymentStatus;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Fine extends Model
{
    protected $fillable = [
        'return_book_id',
        'user_id',
        'late_fee',
        'other_fee',
        'total_fee',
        'payment_status',
        'fine_date',
    ];

    protected function casts(): array
    {
        return [
            'payment_status' => FinePaymentStatus::class,
            'fine_date' => 'date',
        ];
    }

    public function returnBook(): BelongsTo
    {
        return $this->belongsTo(ReturnBook::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public static function totalFines(): array
    {
        return [
            'days' => self::whereDate('created_at', Carbon::now()->toDateString())->count(),
            'weeks' => self::whereBetween('created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])->count(),
            'months' => self::whereMonth('created_at', Carbon::now()->month)
                ->whereYear('created_at', Carbon::now()->year)
                ->count(),
            'years' => self::whereYear('created_at', Carbon::now()->year)->count(),
        ];
    }
}