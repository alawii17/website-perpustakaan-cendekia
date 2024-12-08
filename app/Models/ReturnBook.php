<?php

namespace App\Models;

use App\Enums\ReturnBookStatus;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
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

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function fine(): HasOne
    {
        return $this->hasOne(Fine::class);
    }

    public function returnBookCheck(): HasOne
    {
        return $this->hasOne(ReturnBookCheck::class);
    }

    public function scopeFilter(Builder $query, array $filters): void
    {
        $query->when($filters['search'] ?? null, function($query, $search){
            $query->where(function($query) use($search){
                $query->whereAny([
                    'return_book_code',
                    'status',
                ], 'REGEXP', $search);
            })
            ->orWhereHas('loan', fn($query) => $query->where('loan_code', 'REGEXP', $search))
            ->orWhereHas('user', fn($query) => $query->where('name', 'REGEXP', $search))
            ->orWhereHas('book', fn($query) => $query->where('title', 'REGEXP', $search));
        });
    }

    public function scopeSorting(Builder $query, array $sorts): void
    {
        $query->when($sorts['field'] ?? null && $sorts['direction'] ?? null, function($query) use($sorts){
            match($sorts['field']){
                'loan_code' => $query->whereHas('loan', fn($query) => $query->orderBy('loan_code', $sorts['direction'])),
                default => $query->orderBy($sorts['field'], $sorts['direction']),
            };
        });
    }

    public function scopeReturned(Builder $query): Builder
    {
        return $query->where('status', ReturnBookStatus::RETURNED->value);
    }

    public function scopeFine(Builder $query): Builder
    {
        return $query->where('status', ReturnBookStatus::FINE->value);
    }

    public function scopeChecked(Builder $query): Builder
    {
        return $query->where('status', ReturnBookStatus::CHECKED->value);
    }

    public function scopeMember(Builder $query, int $user_id): Builder
    {
        return $query->where('user_id', $user_id);
    }

    public function isOnTime(): bool
    {
        return Carbon::today()->lessThanOrEqualTo(Carbon::parse($this->loan->due_date));
    }

    public function getDaysLate(): int
    {
        return max(0, Carbon::parse($this->loan->loan_date)->diffInDays(Carbon::parse($this->return_date)));
    }
}