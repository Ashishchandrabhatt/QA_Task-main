<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Transaction;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $user1 = User::create([
            'name' => 'Rahul Sharma',
            'email' => 'rahul@example.com',
            'mobile' => '9876543210',
            'password' => Hash::make('password123'),
            'wallet_balance' => 5000.00,
            'pan' => 'ABCDE1234F',
        ]);

        $user2 = User::create([
            'name' => 'Priya Patel',
            'email' => 'priya@example.com',
            'mobile' => '9123456789',
            'password' => Hash::make('password123'),
            'wallet_balance' => 2500.00,
            'pan' => 'XYZAB5678G',
        ]);

        $operators = ['Airtel', 'Jio', 'Vi', 'BSNL'];
        $statuses = ['success', 'failed', 'pending'];

        foreach (range(1, 15) as $i) {
            Transaction::create([
                'user_id' => $user1->id,
                'mobile' => '98' . rand(10000000, 99999999),
                'operator' => $operators[array_rand($operators)],
                'amount' => rand(1, 5) * 100,
                'status' => $statuses[array_rand($statuses)],
                'type' => 'recharge',
                'remarks' => null,
                'created_at' => now()->subDays(rand(0, 30))->subHours(rand(0, 23)),
            ]);
        }

        foreach (range(1, 8) as $i) {
            Transaction::create([
                'user_id' => $user2->id,
                'mobile' => '91' . rand(10000000, 99999999),
                'operator' => $operators[array_rand($operators)],
                'amount' => rand(1, 10) * 50,
                'status' => $statuses[array_rand($statuses)],
                'type' => 'recharge',
                'remarks' => null,
                'created_at' => now()->subDays(rand(0, 15))->subHours(rand(0, 23)),
            ]);
        }
    }
}
