<?php

namespace App\Http\Controllers\SiteStudent;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ExamSchedule;
use App\Models\ResitExam;
use App\Models\Student;

class ExamScheduleController extends Controller
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

        // Get exam schedules only for those courses
        $schedules = ExamSchedule::with(['course.instructor'])
                                ->whereIn('course_id', $resitCourseIds)
                                ->get();

        if ($schedules->isEmpty()) {
            return response()->json(['message' => 'No exam schedules found for your confirmed resit courses.'], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $schedules
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
    $schedule = ExamSchedule::with(['course.instructor'])
                            ->where('course_id', $course_id)
                            ->first();

    if (!$schedule) {
        return response()->json(['message' => 'No exam schedule found for this course.'], 404);
    }

    return response()->json([
        'success' => true,
        'data' => $schedule
    ]);
}

}
