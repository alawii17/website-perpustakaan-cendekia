<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class FineResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'late_fee' => $this->late_fee,
            'other_fee' => $this->other_fee,
            'total_fee' => $this->total_fee,
            'payment_status' => $this->payment_status,
            'laon' => $this->whenLoaded('returnBook', [
                'id' => $this->returnBook?->loan?->id,
                'loan_code' => $this->returnBook?->loan?->loan_code,
                'loan_date' => Carbon::parse($this->returnBook?->loan?->loan_date)->format('d M Y'),
                'due_date' => Carbon::parse($this->returnBook?->loan?->due_date)->format('d M Y'),
            ]),
            'return_book' => $this->whenLoaded('returnBook', [
                'return_book_code' => $this->returnBook?->return_book_code,
                'return_date' => Carbon::parse($this->returnBook?->return_date)->format('d M Y'),
            ]),
            'user' => [
                'id' => $this->user?->id,
                'name' => $this->user?->name,
            ],
        ];
    }
}
