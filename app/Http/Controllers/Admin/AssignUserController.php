<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MessageType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AssignUserRequest;
use App\Http\Resources\Admin\AssignUserResource;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Spatie\Permission\Models\Role;
use Throwable;

class AssignUserController extends Controller
{
    public function index(): Response
    {
        $users = User::query()
            ->select(['id', 'email', 'username'])
            ->when(request()->search, function($query, $search){
                $query->where('email', 'REGEXP', $search);
            })
            ->when(request()->field && request()->direction, fn($query) => $query->orderBy(request()->field, request()->direction))
            ->with('roles')
            ->paginate(request()->load ?? 10)
            ->withQueryString();

        return inertia('Admin/AssignUsers/Index', [
            'page_settings' => [
                'title' => 'Tetapkan Peran',
                'subtitle' => 'Menampilkan semua data tetapkan peran yang tersimpan pada platform ini. '
            ],
            'users' => AssignUserResource::collection($users)->additional([
                'meta' => [
                    'has_pages' => $users->hasPages(),
                ],
            ]),
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => 10,
            ],
        ]);
    }

    public function edit(User $user): Response
    {
        return inertia('Admin/AssignUsers/Edit', [
            'page_settings' => [
                'title' => 'Sinkronisasi Peran',
                'subtitle' => 'Sinkronisasi peran disini. Klik simpan setelah selesai.',
                'method' => 'PUT',
                'action' => route('admin.assign-users.update', $user),
            ],
            'user' => $user->load('roles'),
            'roles' => Role::query()->select(['id', 'name'])->where('guard_name', 'web')->get()->map(fn($item) => [
                'value' => $item->id,
                'label' => $item->name,
            ]),
        ]);
    }

    public function update(User $user, AssignUserRequest $request): RedirectResponse
    {
        try {
            $user->syncRoles($request->roles);

            flashMessage("Berhasil sinkronisasi peran ke pengguna {$user->name}");
            return to_route('admin.assign-users.index');
        } catch(Throwable $err) {
            flashMessage(MessageType::ERROR->message($err->getMessage()), 'error');
            return to_route('admin.assign-users.index');
        }
    }
}
