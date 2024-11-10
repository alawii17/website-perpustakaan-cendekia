<?php 

namespace App\Enums;

enum ReturnBookCondition: string
{
    case GOOD = "Sesuia";
    case DAMAGED = "Rusak";
    case LOST = "Hilang";

    public static function options(): array
    {
        return collect(self::cases())->map(fn($item) => [
            'value' => $item->value,
            'label' => $item->value,
        ])->values()->toArray();
    }
}