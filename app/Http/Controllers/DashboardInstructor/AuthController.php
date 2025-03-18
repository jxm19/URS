<?php

namespace App\Http\Controllers\DashboardInstructor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Traits\ApiResponse;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    use ApiResponse;

    public function login(Request $request)
    {
       
        $validate = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);
    
        if ($validate->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validate->errors()
            ], 422);
        }
    
        
        $user = User::where('email', $request->email)->first();
    
        
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid Email or Password!'
            ], 401);
        }
    
       
        $token = $user->createToken('token-name')->plainTextToken;
    
        return response()->json([
            'success' => true,
            'message' => 'User logged in successfully!',
            'user' => $user,
            'token' => $token
        ], 200);
     }


    public function logout(Request $request)
    {
        
        $request->user()->currentAccessToken()->delete();
    
        return response()->json([
            'success' => true,
            'message' => 'User logged out successfully!'
        ], 200);
    }
  

   
}
