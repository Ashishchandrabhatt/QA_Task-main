<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $recentTransactions = $user->transactions()
            ->orderBy('created_at', 'asc')
            ->limit(10)
            ->get();

        return Inertia::render('Dashboard', [
            'balance' => $user->wallet_balance,
            'recentTransactions' => $recentTransactions,
            'user' => $user->only(['name', 'email', 'mobile']),
        ]);
    }
}
