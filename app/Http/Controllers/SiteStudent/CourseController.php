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
    $student = Student::where('user_id', auth()->id())
        ->with(['courses.instructor.user', 'grades'])  
        ->first();

    if (!$student) {
        return response()->json(['message' => 'Student not found!'], 404);
    }

    $coursesWithGrades = $student->courses->map(function ($course) use ($student) {
        $grade = $student->grades->where('course_id', $course->id)->first();
        $instructorName = $course->instructor?->user?->name ?? 'Unknown';  

        return [
            'course_id'     => $course->id,
            'course_name'   => $course->course_name,
            'course_code'   => $course->course_code,
            'letter_grade'  => $grade->letter_grade ?? null,
            'instructor'    => $instructorName,  
        ];
    });

    return $this->success(['courses' => $coursesWithGrades]);
}


public function show($id)
{
    $student = Student::where('user_id', auth()->id())
        ->with(['courses.instructor.user', 'grades'])
        ->first();

    if (!$student) {
        return response()->json(['message' => 'Student not found!'], 404);
    }

    $course = $student->courses->where('id', $id)->first();

    if (!$course) {
        return response()->json(['message' => 'Course not found!'], 404);
    }

    $grade = $student->grades->where('course_id', $course->id)->first();
    $instructorName = $course->instructor?->user?->name ?? 'Unknown';  

    $courseDetails = [
        'course_id'     => $course->id,
        'course_name'   => $course->course_name,
        'course_code'   => $course->course_code,
        'letter_grade'  => $grade->letter_grade ?? null,
        'instructor'    => $instructorName,  
    ];

    return $this->success($courseDetails);
}
    
}
