<?php

namespace Database\Seeders;

use App\Models\RouteAccess;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Route;
use Spatie\Permission\Models\Role;

class RouteAccessSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin_role = Role::firstOrCreate(['name' => 'admin']);
        $operator_role = Role::firstOrCreate(['name' => 'opertator']);
        $member_role = Role::firstOrCreate(['name' => 'member']);

        $admin_routes = collect(Route::getRoutes())->filter(function($route){
            return str_starts_with($route->getName(), 'admin.') || 
            str_starts_with($route->getName(), 'profile.') ||
            $route->getName() === 'dashboard';
        });

        foreach($admin_routes as $route){
            RouteAccess::create([
                'route_name' => $route->getName(),
                'role_id' => $admin_role->id,
                'permission_id' => null,
            ]);
        }

        $operator_prefixes = [
            'admin.categories.',
            'admin.publishers.',
            'admin.books.',
            'admin.users.',
            'admin.fine-settings.',
            'admin.loans.',
            'admin.return-books.',
            'admin.announcements.',
        ];

        $operator_routes = collect(Route::getRoutes())->filter(function($route) use($operator_prefixes){
            return in_array($route->getName(), ['dashboard', 'profile']) || 
                collect($operator_prefixes)->contains(function($prefix) use($route){
                    return str_starts_with($route->getName(), $prefix);
                });
        });

        foreach($operator_routes as $route){
            RouteAccess::create([
                'route_name' => $route->getName(),
                'role_id' => $operator_role->id,
                'permission_id' => null,
            ]);
        }

        $member_routes = collect(Route::getRoutes())->filter(function($route){
            return str_starts_with($route->getName(), 'front.') || 
            str_starts_with($route->getName(), 'profile.') ||
            $route->getName() === 'dashboard';
        });

        foreach($member_routes as $route){
            RouteAccess::create([
                'route_name' => $route->getName(),
                'role_id' => $member_role->id,
                'permission_id' => null,
            ]);
        }

    }
}
