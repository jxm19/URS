<?php

namespace App\Http\Controllers\DashboardInstructor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ResitExam;
use App\Models\Student;
use App\Models\Course;
use App\Models\Grade;
use App\Models\Instructor;
use App\Traits\ApiResponse;


class ResitExamController extends Controller
{
    use ApiResponse;

    public function confirmedStudents(Request $request, $courseId)
    {
        $instructor = Instructor::where('user_id', auth()->id())->first();
        
        if (!$instructor) {
            return response()->json(['error' => 'Instructor not found!'], 404);
        }
    
        $course = Course::where('id', $courseId)
        ->where('instructor_id', $instructor->id)
        ->first();

        if (!$course) {
            return response()->json(['error' => 'You are not authorized to view grades for this course.'], 403);
        }
    
        $confirmedResits = ResitExam::with(['student.user', 'grade'])
            ->where('course_id', $courseId)
            ->get();
    
        if ($confirmedResits->isEmpty()) {
            return response()->json([
                'message' => 'No students confirmed for this course.',
            ], 404);
        }
    
        $students = $confirmedResits->map(function ($resit) {
            return [
                'student_id' => $resit->student->id,
                'student_name' => $resit->student->user->name ?? 'N/A',
                'student_university_id' => $resit->student->student_id,
                'letter_grade' => $resit->grade->letter_grade ?? null, 
                'confirmed_at' => $resit->confirmed_at,
            ];
        });
    
        return response()->json([
           'course_code' => $course->course_code,
           'course_name' => $course->course_name,
           'total_confirmed_students' => $students->count(),
           'students' => $students,
        ]);
    }
    
    
}
