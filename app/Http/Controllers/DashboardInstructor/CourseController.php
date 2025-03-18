<?php

namespace App\Http\Controllers\DashboardInstructor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Course;
use App\Traits\ApiResponse;
use App\Models\Instructor;
use Illuminate\Support\Facades\Validator;

class CourseController extends Controller
{
    use ApiResponse;

    public function index()
    {
        $instructor = Instructor::where('user_id', auth()->id())->with('courses')->first();
    
        if (!$instructor) {
            return response()->json(['message' => 'instructor not found!'], 404);
        }
    
        return $this->success($instructor);
    }
    

    public function show($id)
    {
        $instructor = Instructor::where('user_id', auth()->id())->with('courses')->first();
    
        if (!$instructor) {
            return response()->json(['message' => 'instructor not found!'], 404);
        }
    
        $course = $instructor->courses->where('id', $id)->first();
    
        if (!$course) {
            return response()->json(['message' => 'Course not found!'], 404);
        }
    
        return $this->success($course);
    }
    
}
