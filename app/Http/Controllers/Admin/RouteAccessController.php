<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MessageType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\RouteAccessRequest;
use App\Http\Resources\Admin\RouteAccessResource;
use App\Models\RouteAccess;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Response;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Throwable;

use function PHPUnit\Framework\returnValue;

class RouteAccessController extends Controller
{
    public function index(): Response
    {
        $route_accesses = RouteAccess::query()
            ->select(['id', 'route_name', 'role_id', 'permission_id', 'created_at'])
            ->filter(request()->only(['search']))
            ->sorting(request()->only(['field', 'direction']))
            ->with(['role', 'permission'])
            ->paginate(request()->load ?? 10)
            ->withQueryString();
        
        return inertia('Admin/RouteAccesses/Index', [
            'page_settings' => [
                'title' => 'Akses Rute',
                'subtitle' => 'Menampilkan semua data akses rute yang tersedia pada platform ini.',
            ],
            'route_accesses' => RouteAccessResource::collection($route_accesses)->additional([
                'meta' => [
                    'has_pages' => $route_accesses->hasPages(),
                ],
            ]),
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => 10,
            ]
        ]);
    }

    public function create(): Response
    {
        return inertia('Admin/RouteAccesses/Create', [
            'page_settings' => [
                'title' => 'Tambah Akses Rute',
                'subtitle' => 'Tambah akses rute baru disini. Klik simpan setelah selesai.',
                'method' => 'POST',
                'action' => route('admin.route-accesses.store'),
            ],
            'roles' => Role::query()->select(['id', 'name'])->where('guard_name', 'web')->get()->map(fn($item) => [
                'value' => $item->name,
                'label' => $item->name,
            ]),
            'permissions' => Permission::query()->select(['id', 'name'])->where('guard_name', 'web')->get()->map(fn($item) => [
                'value' => $item->name,
                'label' => $item->name,
            ]),
            'routes' => collect(Route::getRoutes())->map(function($route){
                return [
                    'value' => $route->getName(),
                    'label' => $route->getName(),
                ];
            })->filter(),
        ]);
    }

    public function store(RouteAccessRequest $request): RedirectResponse
    {
        try {
            $role = Role::query()->where('name', $request->role)->first();
            $permission = Permission::query()->where('name', $request->permission)->first();

            RouteAccess::create([
                'route_name' => $request->route_name,
                'role_id' => $role->id ?? null,
                'permission_id' => $permission->id ?? null,
            ]);

            flashMessage(MessageType::CREATED->message('Akses Rute'));
            return to_route('admin.route-accesses.index');
        } catch(Throwable $err) {
            flashMessage(MessageType::ERROR->message($err->getMessage()), 'error');
            return to_route('admin.route-accesses.index');
        }
    }
    public function edit(RouteAccess $routeAccess): Response
    {
        return inertia('Admin/RouteAccesses/Edit', [
            'page_settings' => [
                'title' => 'Edit Akses Rute',
                'subtitle' => 'Edit akses rute baru disini. Klik simpan setelah selesai.',
                'method' => 'PUT',
                'action' => route('admin.route-accesses.update', $routeAccess),
            ],
            'roles' => Role::query()->select(['id', 'name'])->where('guard_name', 'web')->get()->map(fn($item) => [
                'value' => $item->name,
                'label' => $item->name,
            ]),
            'permissions' => Permission::query()->select(['id', 'name'])->where('guard_name', 'web')->get()->map(fn($item) => [
                'value' => $item->name,
                'label' => $item->name,
            ]),
            'routes' => collect(Route::getRoutes())->map(function($route){
                return [
                    'value' => $route->getName(),
                    'label' => $route->getName(),
                ];
            })->filter(),
            'routeAccess' => $routeAccess->load(['role', 'permission']),
        ]);
    }

    public function update(RouteAccess $routeAccess, RouteAccessRequest $request): RedirectResponse
    {
        try {
            $role = Role::query()->where('name', $request->role)->first();
            $permission = Permission::query()->where('name', $request->permission)->first();

            $routeAccess->update([
                'route_name' => $request->route_name,
                'role_id' => $role->id ?? null,
                'permission_id' => $permission->id ?? null,
            ]);

            flashMessage(MessageType::UPDATED->message('Akses Rute'));
            return to_route('admin.route-accesses.index');
        } catch(Throwable $err) {
            flashMessage(MessageType::ERROR->message($err->getMessage()), 'error');
            return to_route('admin.route-accesses.index');
        }
    }

    public function destroy(RouteAccess $routeAccess): RedirectResponse
    {
        try {
            $routeAccess->delete();

            flashMessage(MessageType::DELETED->message('Akses Rute'));
            return to_route('admin.route-accesses.index');
        } catch(Throwable $err) {
            flashMessage(MessageType::ERROR->message($err->getMessage()), 'error');
            return to_route('admin.route-accesses.index');
        }
    }
}