<?php

namespace App\Http\Controllers\DashboardUni;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Instructor;
use App\Models\Course;
use App\Traits\ApiResponse;
use Illuminate\Support\Facades\Validator;

class InstructorController extends Controller
{
    use ApiResponse;

    public function store(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'name' => 'required',
            'user_id' => 'required|exists:users,id',
            
        ]);
    
        if ($validate->fails()) {
            return response()->json(['errors' => $validate->errors()], 422);
        }

        $existingInstructor = Instructor::where('user_id', $request->user_id)->first();
        if ($existingInstructor) {
            return response()->json(['message' => 'User already has an Instructor ID'], 422);
        }
    
        $year = date('y'); 
        $randomNumber = rand(1000000, 9999999); 
    
        
        $instructorId = (int)($year . $randomNumber); 
    
        
        if (strlen($instructorId) !== 9) {
            return response()->json(null, ['message' => 'instructor_id should be 9 digits'], 422);
        }
    
        
        $instructor = Instructor::create([
            'name' => $request->name,
            'instructor_id' => $instructorId,
            'user_id' => $request->user_id
        ]);
    
       return response()->json(['message' => 'Instructor created successfully!', 'instructor' => $instructor], 201);
    }

    public function index()
    {
        $instructors = Instructor::with('courses')->get();
        return $this->success($instructors);
    }

    public function show($id)
    {
        $instructor = Instructor::find($id);
        if ($instructor) {
            return $this->success($instructor->load('courses'));
        } else {
            return response()->json(['message' => 'instructor not found!'], 404);
        }
    }


    public function update(Request $request, $id)
    {
        $validate = Validator::make($request->all(), [
            'name' => 'required',
            'user_id' => 'required|exists:users,id',
        ]);
    
        if ($validate->fails()) {
            return response()->json(['errors' => $validate->errors()], 422);
        }
    
        
        $instructor = Instructor::find($id);
        if ($instructor) {
            
            if ($instructor->user_id != $request->user_id) {
                $existinginstructor = Instructor::where('user_id', $request->user_id)->first();
                if ($existinginstructor) {
                    return response()->json(['message' => 'User already has a instructor ID'], 422);
                }
            }
            
            $instructor->update([
                'name' => $request->name,
                'user_id' => $request->user_id 
            ]);

            if ($request->has('courses')) {
                $instructor->courses()->sync($request->courses);
            }
        
    
            return response()->json(['message' => 'instructor updated successfully!', 'instructor' => $instructor], 200);
        } else {
            return response()->json(['message' => 'instructor not found!'], 404);
        }
    }
    
    

    public function destroy($id)
    {
        $instructor = Instructor::find($id);
        if ($instructor) {
            $instructor->delete();
            return $this->success($instructor);
        } else {
            return response()->json(['message' => 'instructor not found!'], 404);
        }
    }
}
