<?php 

namespace App\Enums;

enum UserGender: string
{
    case Male = "Laki-laki";
    case FEMALE = "Perempuan";

    public static function options(): array
    {
        return collect(self::cases())->map(fn($item) => [
            'value' => $item->value,
            'label' => $item->label,
        ])->values()->toArray();
    }
}