<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Stock extends Model
{
    protected $fillable = [
        'book_id',
        'total',
        'available',
        'loan',
        'lost',
        'damaged',
    ];

    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class);
    }

    public function scopeFilter(Builder $query, array $filters): void
    {
        $query ->when($filters['search'] ?? null, function($query, $search){
            $query->where(function($query) use($search){
                $query->whereHas('book', fn($query) => $query->where('title', 'REGEXP', $search));
            });
        });
    }

    public function scopeSorting(Builder $query, array $sorts): void
    {
        $query->when($sorts['field'] ?? null && $sorts['direction'] ?? null, function($query) use($sorts){
            match($sorts['field']){
                'book_id' => $query->join('books', 'stocks.book_id', '=', 'books.id')
                    ->orderBy('books.title', $sorts['direction']),
                default => $query->orderBy($sorts['field'], $sorts['direction']),
            };
        });
    }
}