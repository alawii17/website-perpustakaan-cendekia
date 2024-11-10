<?php 

namespace App\Enums;

enum BookStatus: string
{
    case AVAIBLE = 'Tersedia';
    case UNAVAIBLE = 'Tidak Tersedia';
    case LOAN = 'Dipinjam';
    case LOST = 'Hilang';
    case DAMAGED = 'Rusak';

    public static function options(): array
    {
        return collect(self::cases())->map(fn($item) => [
            'value' => $item->value,
            'label' => $item->name,
        ])->values()->toArray();
    }
}