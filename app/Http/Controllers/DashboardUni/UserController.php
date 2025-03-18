<?php

namespace App\Http\Controllers\DashboardUni;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Traits\ApiResponse;
use App\Models\User;
use App\Http\Requests\Dashboard\UserRequest;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    use ApiResponse;
    
    public function store(Request $request)
     {

         $validated = Validator::make($request->all(), [
             'name' => 'required',
             'email' => 'required|email|unique:users,email',
             'password' => 'required',
             'role' => 'required|in:student,secretary,instructor,university',
         ]);
 
         if ($validated->fails()) {
             return response()->json(['errors' => $validated->errors()], 422);
         }
 
            $userData = $request->only(['name', 'email', 'password', 'role']);
 
        
         if ($userData['role'] == 'student') {
             $userData['is_student'] = 1;
         } elseif ($userData['role'] == 'secretary') {
             $userData['is_secretary'] = 1;
         } elseif ($userData['role'] == 'instructor') {
             $userData['is_instructor'] = 1;
         } elseif ($userData['role'] == 'university') {
            $userData['is_university'] = 1;
         }
 
        
         $user = User::create($userData);
 
       
         return $this->success(['message' => 'User created successfully!', 'user' => $user], 201);
     }

     public function update(Request $request, $id)
     {
       
         $validated = Validator::make($request->all(), [
             'name' => 'nullable|required',
             'email' => 'nullable|required|email|unique:users,email,' . $id,
             'password' => 'nullable|required',
             'role' => 'nullable|required|in:student,secretary,instructor,university',
         ]);
 
         if ($validated->fails()) {
             return response()->json(['errors' => $validated->errors()], 422);
         }
 
        
         $user = User::findOrFail($id);
 
         
         $userData = $validated->validated();
         if (isset($userData['password'])) {
             $userData['password'] = bcrypt($userData['password']);
         }
 
         if (isset($userData['role'])) {
             if ($userData['role'] == 'student') {
                 $userData['is_student'] = 1;
                 $userData['is_secretary'] = 0;
                 $userData['is_instructor'] = 0;
                $userData['is_university'] = 0;
             } elseif ($userData['role'] == 'secretary') {
                 $userData['is_student'] = 0;
                 $userData['is_secretary'] = 1;
                 $userData['is_instructor'] = 0;
                 $userData['is_university'] = 0;
             } elseif ($userData['role'] == 'instructor') {
                 $userData['is_student'] = 0;
                 $userData['is_secretary'] = 0;
                 $userData['is_university'] = 0;
                 $userData['is_instructor'] = 1;
             }  elseif ($userData['role'] == 'university') {
                $userData['is_student'] = 0;
                $userData['is_secretary'] = 0;
                $userData['is_instructor'] = 0;
                $userData['is_university'] = 1;
             }
 
         $user->update($userData);
 
        
         return $this->success(['message' => 'User updated successfully!', 'user' => $user], 200);
     }
 }


     public function index()
     {
         $users = User::all();
         return $this->success(['users' => $users], 200);
     }
 
     public function show($id)
     {
         $user = User::findOrFail($id);
        return $this->success(['user' => $user], 200);
     }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return $this->success(['message' => 'User deleted successfully!'], 200);
    }

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


}
