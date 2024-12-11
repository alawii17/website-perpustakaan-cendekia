<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MessageType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PermissionRequest;
use App\Http\Resources\Admin\PermissionResource;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Spatie\Permission\Models\Permission;
use Throwable;

class PermissionController extends Controller
{
    public function index(): Response
    {
        $permissions = Permission::query()
            ->select(['id','name','guard_name','created_at'])
            ->when(request()->search, function($query, $search){
                $query->whereAny([
                    'name',
                    'guard_name',
                ], 'REGEXP', $search);
            })
            ->when(request()->field && request()->direction, fn($query) => $query->orderBy(request()->field, request()->direction))
            ->paginate(request()->load ?? 10)
            ->withQueryString();
        
        return inertia('Admin/Permissions/Index', [
            'page_settings' => [
                'title' => 'Izin',
                'subtitle' => 'Menampilkan semua data izin yang tersedia pada platform ini. '
            ],
            'permissions' => PermissionResource::collection($permissions)->additional([
                'meta' => [
                    'has_pages' => $permissions->hasPages(),
                ],
            ]),
            'state' => [
                'page' => request()->page ?? 1,
                'search'  => request()->search ?? '',
                'load'  => 10,
            ],
        ]);
    }

    public function create(Permission $permission): Response
    {
        return inertia('Admin/Permissions/Create', [
            'page_settings' => [
                'title' => 'Tambah Izin',
                'subtitle' => 'Tambah izin baru disini. Klik simpan setelah selesai',
                'method' => 'POST',
                'action' => route('admin.permissions.store'),
            ],
        ]);
    }

    public function store(PermissionRequest $request): RedirectResponse
    {
        try {
            Permission::create([
                'name' => $request->name,
                'guard_name' => $request->guard_name ?? 'web',
            ]);

            flashMessage(MessageType::CREATED->message('izin'));
            return to_route('admin.permissions.index');
        } catch(Throwable $err) {
            flashMessage(MessageType::ERROR->message($err->getMessage()), 'error');
            return to_route('admin.permissions.index');
        }
    }

    public function edit(Permission $permission): Response
    {
        return inertia('Admin/Permissions/Edit', [
            'page_settings' => [
                'title' => 'Edit Izin',
                'subtitle' => 'Edit izin disini. Klik simpan setelah selesai',
                'method' => 'PUT',
                'action' => route('admin.permissions.update', $permission),
            ],
            'permission' => $permission,
        ]);
    }

    public function update(Permission $permission, PermissionRequest $request): RedirectResponse
    {
        try {
            $permission->update([
                'name' => $request->name,
                'guard_name' => $request->guard_name ?? 'web',
            ]);

            flashMessage(MessageType::UPDATED->message('izin'));
            return to_route('admin.permissions.index');
        } catch(Throwable $err) {
            flashMessage(MessageType::ERROR->message($err->getMessage()), 'error');
            return to_route('admin.permissions.index');
        }
    }

    public function destroy(Permission $permission): RedirectResponse
    {
        try {
            $permission->delete();

            flashMessage(MessageType::DELETED->message('Izin'));
            return to_route('admin.permissions.index');
        } catch(Throwable $err) {
            flashMessage(MessageType::ERROR->message($err->getMessage()), 'error');
            return to_route('admin.permissions.index');
        }
    }
}
