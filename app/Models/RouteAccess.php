<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RouteAccess extends Model
{
    protected $fillable = [
        'route_name',
        'role_id',
        'permission_id'
    ];

    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

    public function permission(): BelongsTo
    {
        return $this->belongsTo(Permission::class);
    }

    public function scopeSorting(Builder $query, array $sorts): void
    {
        $query->when($sorts['field'] ?? null && $sorts['direction'] ?? null, function($query) use($sorts){
            match($sorts['field']){
                'role_id' => $query->whereHas('role', fn($query) => $query->orderBy('name', $sorts['direction'])),
                'permission_id' => $query->whereHas('permission', fn($query) => $query->orderBy('name', $sorts['direction'])),
                default => $query->orderBy($sorts['field'], $sorts['direction']),
            };
        });
    }

    public function scopeFilter(Builder $query, array $filters): void
    {
        $query->when($filters['search'] ?? null, function($query, $search){
            $query->where('route_name', 'REGEXP', $search)
                ->orWhereHas('role', fn($query) => $query->where('name', 'REGEXP', $search))
                ->orWhereHas('permission', fn($query) => $query->where('name', 'REGEXP', $search));
        });
    }
}
