<?php

namespace App\Http\Controllers\SiteStudent;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Grade;
use App\Models\Student;
use App\Model\ResitExam;
use App\Traits\ApiResponse;
use App\Models\Course;


class GradeController extends Controller
{
    use ApiResponse;

    public function index()
    {
        $student = Student::where('user_id', auth()->id())
            ->with('courses')  
            ->first();
    
        if (!$student) {
            return response()->json(['message' => 'Student not found!'], 404);
        }

        $coursesWithGrades = $student->courses->map(function ($course) use ($student) {

            $grade = $student->grades->where('course_id', $course->id)->first();

            $resitExamGrade = $grade ? $grade->resit_exam_grade ?? null : null;  

            return [
                'course_id'        => $course->id,
                'course_name'      => $course->course_name,
                'course_code'      => $course->course_code,
                'final_grade'      => $grade->final_grade ?? null,
                'letter_grade'     => $grade->letter_grade ?? null,
                'status'           => $grade->status ?? null,
                'resit_exam_grade' => $resitExamGrade,  
            ];
        });
    
        return $this->success(['courses' => $coursesWithGrades]);
    }
}