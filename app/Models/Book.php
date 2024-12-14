<?php

namespace App\Models;

use App\Enums\BookLanguage;
use App\Enums\BookStatus;
use App\Observers\BookObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

#[ObservedBy(BookObserver::class)]

class Book extends Model
{
    protected $fillable = [
        'book_code',
        'title',
        'slug',
        'author',
        'publication_year',
        'isbn',
        'language',
        'synopsis',
        'number_of_pages',
        'status',
        'cover',
        'price',
        'category_id',
        'publisher_id',
    ];

    protected function casts(): array{
        return [
            'language' => BookLanguage::class,
            'status' => BookStatus::class,
        ];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function stock(): HasOne
    {
        return $this->hasOne(Stock::class);
    }

    public function loans(): HasMany
    {
        return $this->hasMany(Loan::class);
    }

    public function publisher(): BelongsTo
    {
        return $this->belongsTo(Publisher::class);
    }

    public function scopeFilter(Builder $query, array $filters): void
    {
        $query->when($filters['search'] ?? null, function($query, $search) {
            $query->where(function($query) use($search){
                $query->whereAny([
                    'book_code',
                    'title',
                    'slug',
                    'author',
                    'publication_year',
                    'isbn',
                    'language',
                    'status',
                ], 'REGEXP', $search);
            });
        });
    }

    public function scopeSorting(Builder $query, array $sorts): void
    {
        $query->when($sorts['field'] ?? null && $sorts['direction'] ?? null, function($query) use($sorts){
            $query->orderBy($sorts['field'], $sorts['direction']);
        });
    }

    public function updateStock($colomnToDecrement, $colomnToIncrement)
    {
        if ($this->stock->$colomnToDecrement > 0) {
            return $this->stock()->update([
                $colomnToDecrement => $this->stock->$colomnToDecrement - 1,
                $colomnToIncrement => $this->stock->$colomnToIncrement + 1,
            ]);
        }

        return false;
    }

    public function stock_loan() {
        return $this->updateStock('available', 'loan');
    }

    public function stock_lost() {
        return $this->updateStock('loan', 'lost');
    }

    public function stock_damaged() {
        return $this->updateStock('loan', 'damaged');
    }

    public function stock_loan_return(){
        return $this->updateStock('loan', 'available');
    }

    public static function leastLoanBooks($limit = 5){
        return self::query()
            ->select(['id', 'title', 'author'])
            ->withCount('loans')
            ->orderBy('loans_count')
            ->limit($limit)
            ->get();
    }

    public static function mostLoanBooks($limit = 5){
        return self::query()
            ->select(['id', 'title', 'author'])
            ->withCount('loans')
            ->orderByDesc('loans_count')
            ->limit($limit)
            ->get();
    }
}