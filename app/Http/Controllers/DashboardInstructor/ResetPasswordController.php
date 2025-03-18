<?php

namespace App\Http\Controllers\DashboardInstructor;

use App\Http\Controllers\Controller;
use App\Mail\OtpMail;
use App\Models\User;
use App\Models\PasswordResetToken;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Exception;

class ResetPasswordController extends Controller
{
    public function forget(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        $user = User::where('email', $request->email)->first();
        $otp = random_int(1000, 9999);

        PasswordResetToken::where('email', $user->email)->delete();
       
        PasswordResetToken::create([
            'email' => $user->email,
            'token' => Hash::make($otp),
            'created_at' => now(),
        ]);

        Mail::to($user->email)->send(new OtpMail([
            'subject' => 'Verification Code',
            'title' => 'Your OTP Code',
            'otp' => $otp,
        ]));

        return response()->json(['message' => 'OTP sent successfully!','Verification Code' => $otp ], 200);
    }

    
    public function verify(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'otp' => 'required|numeric'
        ]);

        $resetToken = PasswordResetToken::where('email', $request->email)->first();

        if (!$resetToken || !Hash::check($request->otp, $resetToken->token)) {
            return response()->json(['message' => 'Invalid OTP'], 422);
        }

        $resetToken->delete();

        $resetTokenString = Str::random(40);
        PasswordResetToken::create([
            'email' => $request->email,
            'token' => $resetTokenString,
            'created_at' => now(),
        ]);

        return response()->json([
            'message' => 'OTP verified successfully',
            'reset_token' => $resetTokenString,
        ], 200);
    }

    
    public function reset(Request $request)
    {
        $request->validate([
            'token' => 'required|string',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $resetToken = PasswordResetToken::where('token', $request->token)->first();

        if (!$resetToken) {
            return response()->json(['message' => 'Invalid or expired token'], 401);
        }

        $user = User::where('email', $resetToken->email)->first();
        $user->update([
            'password' => Hash::make($request->password)
        ]);

        $resetToken->delete();

        return response()->json(['message' => 'Password reset successfully'], 200);
    }
}
