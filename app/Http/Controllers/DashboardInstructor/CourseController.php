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

    // Controller Method to fetch courses for a specific instructor
public function index()
{
    $userId = auth()->id();  // Get authenticated user's ID from the auth system
    $instructor = Instructor::where('user_id', $userId)->with('courses')->first();

    if (!$instructor) {
        return response()->json(['message' => 'Instructor not found!'], 404);
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
        
        $students = $course->students;
        return $this->success($course);
    }
    
}
