<?php

namespace App\Models;

use App\Enums\FinePaymentStatus;
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
}