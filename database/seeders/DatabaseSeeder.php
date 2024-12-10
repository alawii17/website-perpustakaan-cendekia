<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => $name = 'Roronoa Zoro',
            'username' => usernameGenerator($name),
            'email' => 'zoro@cendekia.com',
        ])->assignRole(Role::create(['name' => 'admin']));

        User::factory()->create([
            'name' => $name = 'Kuroaci Sanji',
            'username' => usernameGenerator($name),
            'email' => 'sanji@cendekia.com',
        ])->assignRole(Role::create(['name' => 'operator']));

        User::factory()->create([
            'name' => $name = 'Monkey D Luffy',
            'username' => usernameGenerator($name),
            'email' => 'luffy@cendekia.com',
        ])->assignRole(Role::create(['name' => 'member']));

        $this->call(CategorySeeder::class);
        $this->call(PublisherSeeder::class);

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}