<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RechargeController;
use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;

Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

Route::middleware('auth')->group(function () {
    Route::get('/', fn () => redirect('/dashboard'));
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/recharge', [RechargeController::class, 'create'])->name('recharge');
    Route::post('/recharge', [RechargeController::class, 'store']);

    Route::get('/transactions', [TransactionController::class, 'index'])->name('transactions');
    Route::get('/transactions/{id}', [TransactionController::class, 'show']);

    Route::get('/profile', [ProfileController::class, 'show'])->name('profile');
    Route::put('/profile', [ProfileController::class, 'update']);

    Route::prefix('api')->group(function () {
        Route::post('/recharge', [RechargeController::class, 'storeApi']);
        Route::get('/transactions', [TransactionController::class, 'apiIndex']);
        Route::get('/transactions/{id}', [TransactionController::class, 'show']);
        Route::get('/balance', function () {
            return response()->json(['balance' => auth()->user()->wallet_balance]);
        });
    });
});
