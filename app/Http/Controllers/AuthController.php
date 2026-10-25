<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    //
    public function login(Request $request)
    {
        $credentials = $request->validate([
            "email" => ["required", "email"],
            "password" => ["required"],
            'remember' => 'boolean'
        ]);

        $remember = $credentials['remember'] ?? false;

        unset($credentials['remember']);

        if (!Auth::attempt($credentials, $remember)) {
            return response()->json([
                'message' => 'Email or Pass Is incorrect'
            ], 422);
        }

        $user = Auth::user();
        if ($user->is_admin) {
            Auth::logout();

            return response()->json([
                'message' => 'You don\'t have permission'
            ], 403);
        }
        $token = $user->createToken('main')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token'=> $token
        ]);
    }

    public function logout(){
        
        $user = Auth::user();
        $user->currentAccessToken()->delete();

        return response('', 204 );
    }
}
