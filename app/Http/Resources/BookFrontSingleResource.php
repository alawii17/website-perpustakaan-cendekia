<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class BookFrontSingleResource extends JsonResource
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
            'title' => $this->title,
            'slug' => $this->slug,
            'cover' => $this->cover ? Storage::url($this->cover) : null,
            'synopsis' => $this->synopsis,
            'publication_year' => $this->publication_year,
            'isbn' => $this->isbn,
            'author' => $this->author,
            'number_of_pages' => $this->number_of_pages,
            'created_at' => $this->created_at->format('d M Y'),
            'category' => $this->whenLoaded('category', [
                'id' => $this->category?->id,
                'name' => $this->category?->name,
            ]),
            'publisher' => $this->whenLoaded('publisher', [
                'id' => $this->publisher?->id,
                'name' => $this->publisher?->name,
            ]),
            'stock' => $this->whenLoaded('stock', [
                'available' => $this->stock?->available,
            ]),
        ];
    }
}
