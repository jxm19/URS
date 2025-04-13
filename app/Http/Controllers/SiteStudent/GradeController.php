<?php

namespace App\Http\Controllers\SiteStudent;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Grade;
use App\Models\Student;
use App\Traits\ApiResponse;
use App\Models\Course;


class GradeController extends Controller
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
                'final_grade'   => $grade->final_grade ?? null,
                'letter_grade'  => $grade->letter_grade ?? null,
                'status'        => $grade->status ?? null,  
            ];
        });
    
        return $this->success(['courses' => $coursesWithGrades]);
    }
    
}
