<?php

namespace App\Http\Controllers\SiteStudent;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\Student;
use App\Traits\ApiResponse;

class CourseController extends Controller
{
    use ApiResponse;

    public function index()
    {
        $student = Student::where('user_id', auth()->id())->with('courses')->first();
    
        if (!$student) {
            return response()->json(['message' => 'Student not found!'], 404);
        }
    
        return $this->success($student);
    }
    

    public function show($id)
    {
        $student = Student::where('user_id', auth()->id())->with('courses')->first();
    
        if (!$student) {
            return response()->json(['message' => 'Student not found!'], 404);
        }
    
        $course = $student->courses->where('id', $id)->first();
    
        if (!$course) {
            return response()->json(['message' => 'Course not found!'], 404);
        }
    
        return $this->success($course);
    }
    

    
}
