<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ReturnBookFrontSingleResource extends JsonResource
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
            'return_book_code' => $this->return_book_code,
            'status' => $this->status,
            'return_date' => $this->return_date ? Carbon::parse($this->return_date)->format('d M Y') : null,
            'created_at' => $this->created_at->format('d M Y'),
            'dayslate' => $this->dayslate,
            'book' => $this->whenLoaded('book', [
                'id' => $this->book?->id,
                'title' => $this->book?->title,
                'slug' => $this->book?->slug,
                'cover' => $this->book?->cover ? Storage::url($this->book?->cover) : null,
                'synopsis' => $this->book?->synopsis,
            ]),
            'loan' => $this->whenLoaded('loan', [
                'id' => $this->loan?->id,
                'loan_code' => $this->loan?->loan_code,
                'loan_date' => Carbon::parse($this->loan?->loan_date)->format('d M Y'),
                'due_date' => Carbon::parse($this->loan?->due_date)->format('d M Y'),
            ]),
            'user' => $this->whenLoaded('user', [
                'id' => $this->user?->id,
                'name' => $this->user?->name,
            ]),
            'fine' => $this->whenLoaded('fine', [
                'id' => $this->fine?->id,
                'late_fee' => $this->fine?->late_fee,
                'other_fee' => $this->fine?->other_fee,
                'total_fee' => $this->fine?->total_fee,
                'payment_status' => $this->fine?->payment_status,
            ]),
            'return_book_check' => $this->whenLoaded('returnBookCheck', [
                'condition' => $this->returnBookCheck?->condition,
                'notes' => $this->returnBookCheck?->notes,
            ])
        ];
    }
}
