<?php

namespace App\Http\Controllers\DashboardUni;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\Student;
use App\Traits\ApiResponse;
use Illuminate\Support\Facades\Validator;

class CourseController extends Controller
{
    use ApiResponse;

    public function index()
    {
        $courses = Course::all();
        return $this->success($courses);
    }

    public function show($id)
    {
        $course = Course::find($id);
        if ($course) {
            return $this->success($course);
        } else {
            return response()->json(['message' => 'Course not found!'], 404);
        }
    }

    public function store(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'course_code' => 'required|unique:courses',
            'course_name' => 'required',
            'instructor_id' => 'required|exists:instructors,id'
        ]);
    
        if ($validate->fails()) {
            return response()->json(['errors' => $validate->errors()], 422);
        }

        $course = Course::create($request->all());
        return $this->success(['message' => 'Course created successfully!', 'course' => $course], 201);
    }


    public function update(Request $request, $id)
    {
        $validate = Validator::make($request->all(), [
            'course_code' => 'nullable|unique:courses,course_code,' . $id,
            'course_name' => 'nullable',
            'instructor_id' => 'nullable|required|exists:instructors,id'
        ]);

        if ($validate->fails()) {
            return response()->json(['errors' => $validate->errors()], 422);
        }

        $course = Course::find($id);
        if ($course) {
            $course->update($request->all());
            return $this->success(['message' => 'Course updated successfully!', 'course' => $course]);
        } else {
            return response()->json(['message' => 'Course not found!'], 404);
        }
    }

    public function destroy($id)
    {
        $course = Course::find($id);
        if ($course) {
            $course->delete();
            return $this->success(['message' => 'Course deleted successfully!']);
        } else {
            return response()->json(['message' => 'Course not found!'], 404);
        }
    }
}
