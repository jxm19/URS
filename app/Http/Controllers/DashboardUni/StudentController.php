<?php

namespace App\Http\Controllers\DashboardUni;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Student;
use App\Traits\ApiResponse;
use Illuminate\Support\Facades\Validator;

class StudentController extends Controller
{
    use ApiResponse;

    public function index()
    {
        $students = Student::with('courses')->get();
        return $this->success($students);
    }

    public function show($id)
    {
        $student = Student::find($id);
        if ($student) {
            return $this->success($student->load('courses'));
        } else {
            return response()->json(['message' => 'Student not found!'], 404);
        }
    }

    public function store(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'name' => 'required',
            'user_id' => 'required|exists:users,id',
            'courses' => 'array',
            'courses.*' => 'exists:courses,id'
        ]);
    
        if ($validate->fails()) {
            return response()->json(['errors' => $validate->errors()], 422);
        }

        $existingStudent = Student::where('user_id', $request->user_id)->first();
        if ($existingStudent) {
            return response()->json(['message' => 'User already has a student ID'], 422);
        }
    
        $year = date('y'); 
        $randomNumber = rand(1000000, 9999999); 
    
        
        $studentId = (int)($year . $randomNumber); 
    
        
        if (strlen($studentId) !== 9) {
            return response()->json(null, ['message' => 'student_id should be 9 digits'], 422);
        }
    
        
        $student = Student::create([
            'name' => $request->name,
            'student_id' => $studentId,
            'user_id' => $request->user_id
        ]);
    
       return response()->json(['message' => 'Student created successfully!', 'student' => $student], 201);
    }
    

    public function update(Request $request, $id)
    {
        $validate = Validator::make($request->all(), [
            'name' => 'required',
            'user_id' => 'required|exists:users,id',
            'courses' => 'array',
            'courses.*' => 'exists:courses,id'
        ]);
    
        if ($validate->fails()) {
            return response()->json(['errors' => $validate->errors()], 422);
        }
    
        
        $student = Student::find($id);
        if ($student) {
            
            if ($student->user_id != $request->user_id) {
                $existingStudent = Student::where('user_id', $request->user_id)->first();
                if ($existingStudent) {
                    return response()->json(['message' => 'User already has a student ID'], 422);
                }
            }
            
            $student->update([
                'name' => $request->name,
                'user_id' => $request->user_id 
            ]);

            if ($request->has('courses')) {
                $student->courses()->sync($request->courses);
            }
        
    
            return response()->json(['message' => 'Student updated successfully!', 'student' => $student], 200);
        } else {
            return response()->json(['message' => 'Student not found!'], 404);
        }
    }
    
    

    public function destroy($id)
    {
        $student = Student::find($id);
        if ($student) {
            $student->delete();
            return $this->success($student);
        } else {
            return response()->json(['message' => 'Student not found!'], 404);
        }
    }
}
