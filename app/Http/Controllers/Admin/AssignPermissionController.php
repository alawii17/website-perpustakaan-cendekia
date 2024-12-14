<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MessageType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AssignPermissionRequest;
use App\Http\Resources\Admin\AssignPermissionResource;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Throwable;

class AssignPermissionController extends Controller
{
    public function index(): Response
    {
        $roles = Role::query()
            ->select(['id', 'name', 'guard_name', 'created_at'])
            ->when(request()->search, function($query, $search){
                $query->where('name', 'REGEXP', $search);
            })
            ->when(request()->field && request()->direction, fn($query) => $query->orderBy(request()->field, request()->direction))
            ->with('permissions')
            ->paginate(request()->load ?? 10)
            ->withQueryString();

        return inertia('Admin/AssignPermissions/Index', [
            'page_settings' => [
                'title' => 'Tetapkan Izin',
                'subtitle' => 'Menampilkan semua data tetapkan izin yang tersimpan pada platform ini. '
            ],
            'roles' => AssignPermissionResource::collection($roles)->additional([
                'meta' => [
                    'has_pages' => $roles->hasPages(),
                ],
            ]),
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => 10,
            ],
        ]);
    }

    public function edit(Role $role): Response
    {
        return inertia('Admin/AssignPermissions/Edit', [
            'page_settings' => [
                'title' => 'Sinkronisasi Izin',
                'subtitle' => 'Sinkronisasi izin disini. Klik simpan setelah selesai.',
                'method' => 'PUT',
                'action' => route('admin.assign-permissions.update', $role),
            ],
            'role' => $role->load(['permissions']),
            'permissions' => Permission::query()->select(['id', 'name'])->where('guard_name', 'web')->get()->map(fn($item) => [
                'value' => $item->name,
                'label' => $item->name,
            ]),
        ]);
    }

    public function update(Role $role, AssignPermissionRequest $request): RedirectResponse
    {
        try {
            $role->syncPermissions($request->permissions);

            flashMessage("Berhasil sinkronisasi izin ke peran {$role->name}");
            return to_route('admin.assign-permissions.index');
        } catch(Throwable $err) {
            flashMessage(MessageType::ERROR->message($err->getMessage()), 'error');
            return to_route('admin.assign-permissions.index');
        }
    }
}
