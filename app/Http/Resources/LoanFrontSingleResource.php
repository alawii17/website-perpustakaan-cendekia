<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;

class LoanFrontSingleResource extends JsonResource
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
            'loan_code' => $this->loan_code,
            'loan_date' => Carbon::parse($this->loan_date)->format('d M Y'),
            'due_date' => Carbon::parse($this->due_date)->format('d M Y'),
            'created_at' => $this->created_at->format('d M Y'),
            'book' => $this->whenLoaded('book', [
                'id' => $this->book?->id,
                'title' => $this->book?->title,
                'slug' => $this->book?->slug,
                'cover' => $this->book?->cover ? Storage::url($this->book?->cover) : null,
                'synopsis' => $this->book?->synopsis,
            ]),
            'return_book' => $this->whenLoaded('returnBook', [
                'status' => $this->returnBook?->status,
            ]),
            'user' => $this->whenLoaded('user', [
                'id' => $this->user?->id,
                'name' => $this->user?->name,
            ])
        ];
    }
}
