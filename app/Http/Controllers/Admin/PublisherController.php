<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MessageType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PublisherRequest;
use App\Http\Resources\Admin\PublisherResource;
use App\Models\Publisher;
use App\Traits\Hasfile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Throwable;

class PublisherController extends Controller
{
    use Hasfile;

    public function index(): Response
    {
        $publishers = Publisher::query()
            ->select(['id', 'name', 'slug', 'address', 'email', 'phone', 'created_at'])
            ->filter(request()->only(['search']))
            ->sorting(request()->only(['field', 'direction']))
            ->latest('created_at')
            ->paginate(request()->load ?? 10)
            ->withQueryString();
        
        return inertia('Admin/Publishers/Index', [
            'page_settings' => [
                'title' => 'Penerbit',
                'subtitle' => 'Menampilkan semua data penerbit yang tersedia pada platform ini',
            ],
            'publishers' => PublisherResource::collection($publishers)->additional([
                'meta' => [
                    'has_pages' => $publishers->hasPages(),
                ],
            ]),
            'state' => [
                'page' => request()-> page ?? 1,
                'search' => request()-> search ?? '',
                'load' => 10,
            ],
        ]);
    }

    public function create(): Response
    {
        return inertia('Admin/Publishers/Create', [
            'page_settings' => [
                'title' => 'Tambah Penerbit',
                'subtitle' => 'Buat penerbut baru disini. Klik simpan setelah selesai',
                'method' => 'POST',
                'action' => route('admin.publishers.store'),
            ],
        ]);
    }

    public function store(PublisherRequest $request): RedirectResponse
    {
        try {
            Publisher::create([
                'name' => $name = $request->name,
                'slug' => str()->lower(str()->slug($name). str()->random(4)),
                'address' => $request->address,
                'email' => $request->email,
                'phone' => $request->phone,
                'logo' => $this->upload_file($request, 'logo', 'publishers')
            ]);

            flashMessage(MessageType::CREATED->message('Penerbit'));
            return to_route('admin.publishers.index');
        } catch(Throwable $err) {
            flashMessage(MessageType::ERROR->message(error: $err->getMessage()), 'error');
            return to_route('admin.publishers.index');
        }
    }

    public function edit(Publisher $publisher): Response
    {
        return inertia('Admin/Publishers/Edit', [
            'page_settings' => [
                'title' => 'Edit Penerbit',
                'subtitle' => 'Edit penerbit disini. Klik simpan setelah selesai',
                'method' => 'PUT',
                'action' => route('admin.publishers.update', $publisher)
            ],
            'publisher' => $publisher,
        ]);
    }

    public function update(Publisher $publisher, PublisherRequest $request): RedirectResponse
    {
        try {
            $publisher->update([
                'name' => $name = $request->name,
                'slug' => $name !== $publisher->name ? str()->lower(str()->slug($name) . str()->random(4)) : $publisher->slug,
                'address' => $request->address,
                'email' => $request->email,
                'phone' => $request->phone,
                'logo' => $this->update_file($request, $publisher, 'logo', 'publishers')
            ]);

            flashMessage(MessageType::UPDATED->message('Penerbit'));
            return to_route('admin.publishers.index');
        } catch(Throwable $err) {
            flashMessage(MessageType::ERROR->message(error: $err->getMessage()), 'error');
            return to_route('admin.publishers.index');
        }
    }

    public function destroy(Publisher $publisher): RedirectResponse
    {
        try {
            $this->delete_file($publisher, 'logo');
            $publisher->delete();

            flashMessage(MessageType::DELETED->message('Penerbit'));
            return to_route('admin.publishers.index');
        } catch (Throwable $err) {
            flashMessage(MessageType::ERROR->message(error: $err->getMessage()), 'error');
            return to_route('admin.publishers.index');
        }
    }
}