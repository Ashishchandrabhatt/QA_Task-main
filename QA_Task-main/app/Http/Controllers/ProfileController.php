<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function show()
    {
        $user = Auth::user();

        return Inertia::render('Profile', [
            'user' => $user->only(['name', 'email', 'mobile', 'pan']),
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|max:255',
            'mobile' => 'required|string',
            'pan' => 'nullable|string|max:10',
        ]);

        $user = Auth::user();
        $user->update($request->only(['name', 'email', 'mobile', 'pan']));

        return redirect()->back()->with('success', 'Profile updated successfully.');
    }
}
