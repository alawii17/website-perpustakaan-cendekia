<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\FineSettingRequest;
use App\Models\FineSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class FineSettingController extends Controller
{
    public function create(): Response
    {
        $fine_setting = FineSetting::first();
        return inertia('Admin/FineSettings/Create', [
            'page_settings' => [
                'title' => 'Pengaturan Denda',
                'subtitle' => 'Konfigurasi pengaturan denda disini. Klik simpan setelah selesai.',
                'method' => 'PUT',
                'action' => route('admin.fine-settings.store'),
            ],
            'fine_setting' => $fine_setting,
        ]);
    }

    public function store(FineSettingRequest $request): RedirectResponse
    {
        $fine_setting = FineSetting::updateOrCreate(
            [],
            [
                'late_fee_per_day' => $request->late_fee_per_day,
                'damage_fee_percentage' => $request->damage_fee_percentage,
                'lost_fee_percentage' => $request->lost_fee_percentage,
            ],
        );

        flashMessage('Berhasil melakukan perubahan pengaturan denda');
        return to_route('admin.fine-settings.create');
    }
}
