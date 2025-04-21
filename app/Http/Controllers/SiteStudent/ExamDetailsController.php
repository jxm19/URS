<?php

namespace App\Http\Controllers\SiteStudent;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ExamDetail;
use App\Models\ResitExam;
use App\Models\Student;

class ExamDetailsController extends Controller
{
    public function index()
    {
        $student = Student::where('user_id', auth()->id())->first();

        if (!$student) {
            return response()->json(['message' => 'Student not found!'], 404);
        }

        // Get confirmed resit exams for this student
        $resitCourseIds = ResitExam::where('student_id', $student->id)
                                ->pluck('course_id');

        if ($resitCourseIds->isEmpty()) {
            return response()->json(['message' => 'No confirmed resit exams found.'], 404);
        }

        // Get exam details only for those courses
        $details = ExamDetail::with(['course.instructor'])
                                ->whereIn('course_id', $resitCourseIds)
                                ->get();

        if ($details->isEmpty()) {
            return response()->json(['message' => 'No exam detailes found for your confirmed resit courses.'], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $details
        ]);
    }

    public function show($course_id)
{
    $student = Student::where('user_id', auth()->id())->first();

    if (!$student) {
        return response()->json(['message' => 'Student not found!'], 404);
    }

    // Check if this course is confirmed for resit by this student
    $resitExam = ResitExam::where('student_id', $student->id)
                        ->where('course_id', $course_id)
                        ->first();

    if (!$resitExam) {
        return response()->json(['message' => 'You have not confirmed a resit for this course.'], 404);
    }

    // Fetch exam schedule for this course
    $detail = ExamSchedule::with(['course.instructor'])
                            ->where('course_id', $course_id)
                            ->first();

    if (!$detail) {
        return response()->json(['message' => 'No exam details found for this course.'], 404);
    }

    return response()->json([
        'success' => true,
        'data' => $detail
    ]);
}

}
