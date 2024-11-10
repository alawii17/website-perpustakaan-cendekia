<?php

namespace App\Models;

use App\Enums\ReturnBookStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class ReturnBook extends Model
{
    protected $fillable = [
        'return_book_code',
        'load_id',
        'user_id',
        'book_id',
        'return_date',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'return_date' => 'date',
            'status' => ReturnBookStatus::class,
        ];
    }

    public function loan(): BelongsTo
    {
        return $this->belongsTo(Loan::class);
    }

    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class);
    }

    public function fine(): HasOne
    {
        return $this->hasOne(Fine::class);
    }

    public function returnBookCheck(): HasOne
    {
        return $this->hasOne(ReturnBookCheck::class);
    }
}