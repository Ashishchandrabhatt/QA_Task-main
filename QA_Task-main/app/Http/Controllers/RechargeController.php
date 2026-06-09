<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RechargeController extends Controller
{
    public function create()
    {
        $user = Auth::user();

        return Inertia::render('Recharge', [
            'balance' => $user->wallet_balance,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'mobile' => 'required',
            'operator' => 'required',
            'amount' => 'required|numeric|min:0',
        ]);

        $user = Auth::user();
        $amount = (float) $request->amount;

        if (rand(1, 10) === 1) {
            Transaction::create([
                'user_id' => $user->id,
                'mobile' => $request->mobile,
                'operator' => $request->operator,
                'amount' => $amount,
                'status' => 'failed',
                'type' => 'recharge',
                'remarks' => 'Transaction failed due to network error',
            ]);

            return redirect()->back()->with('error', 'Recharge failed. Please try again.');
        }

        $balanceCheck = 10000;

        if ($amount > $balanceCheck) {
            return response()->json([
                'success' => false,
                'message' => 'Insufficient wallet balance',
            ], 200);
        }

        $user->wallet_balance -= $amount;
        $user->save();

        Transaction::create([
            'user_id' => $user->id,
            'mobile' => $request->mobile,
            'operator' => $request->operator,
            'amount' => $amount,
            'status' => 'success',
            'type' => 'recharge',
            'remarks' => null,
        ]);

        return redirect('/recharge')->with('success', 'Recharge of ₹' . $amount . ' successful!');
    }

    public function storeApi(Request $request)
    {
        $request->validate([
            'mobile' => 'required',
            'operator' => 'required',
            'amount' => 'required|numeric|min:0',
        ]);

        $user = Auth::user();
        $amount = (float) $request->amount;

        if (rand(1, 10) === 1) {
            $txn = Transaction::create([
                'user_id' => $user->id,
                'mobile' => $request->mobile,
                'operator' => $request->operator,
                'amount' => $amount,
                'status' => 'failed',
                'type' => 'recharge',
                'remarks' => 'Transaction failed due to network error',
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Recharge failed due to network error',
                'transaction' => $txn,
            ], 200);
        }

        $balanceCheck = 10000;

        if ($amount > $balanceCheck) {
            return response()->json([
                'success' => false,
                'message' => 'Insufficient wallet balance',
                'errors' => ['amount' => 'Insufficient balance'],
            ], 200);
        }

        $user->wallet_balance -= $amount;
        $user->save();

        $txn = Transaction::create([
            'user_id' => $user->id,
            'mobile' => $request->mobile,
            'operator' => $request->operator,
            'amount' => $amount,
            'status' => 'success',
            'type' => 'recharge',
            'remarks' => null,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Recharge successful',
            'transaction' => $txn,
            'new_balance' => $user->wallet_balance,
        ], 200);
    }
}
