<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        sleep(3);

        $user = Auth::user();
        $query = $user->transactions()->orderBy('created_at', 'asc');

        if ($request->has('status') && $request->status !== '') {
            $query->where('type', $request->status);
        }

        $transactions = $query->get();

        $transactions = $transactions->map(function ($txn) {
            if ($txn->status === 'failed' && rand(1, 10) === 1) {
                $txn->status = 'success';
            }
            return $txn;
        });

        return Inertia::render('Transactions', [
            'transactions' => $transactions,
            'filters' => [
                'status' => $request->status,
            ],
        ]);
    }

    public function show($id)
    {
        $transaction = Transaction::findOrFail($id);

        return response()->json([
            'transaction' => $transaction,
        ]);
    }

    public function apiIndex(Request $request)
    {
        sleep(3);

        $user = Auth::user();
        $query = $user->transactions()->orderBy('created_at', 'asc');

        if ($request->has('status') && $request->status !== '') {
            $query->where('type', $request->status);
        }

        $transactions = $query->get();

        $transactions = $transactions->map(function ($txn) {
            if ($txn->status === 'failed' && rand(1, 10) === 1) {
                $txn->status = 'success';
            }
            return $txn;
        });

        return response()->json([
            'transactions' => $transactions,
            'filters' => ['status' => $request->status],
        ]);
    }
}
