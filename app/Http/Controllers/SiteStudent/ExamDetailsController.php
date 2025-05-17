<?php

namespace App\Http\Controllers\SiteStudent;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ExamDetail;
use App\Models\ResitExam;
use App\Models\Course;
use App\Models\Student;

class ExamDetailsController extends Controller
{
    public function index()
    {
        // العثور على الطالب باستخدام المعرف الخاص بالمستخدم الحالي
        $student = Student::where('user_id', auth()->id())->first();
    
        if (!$student) {
            return response()->json(['message' => 'Student not found!'], 404);
        }
    
        // الحصول على الكورسات المعاد الامتحان لها والتي تم تأكيدها لهذا الطالب
        $resitCourseIds = ResitExam::where('student_id', $student->id)
                                    ->pluck('course_id');
    
        if ($resitCourseIds->isEmpty()) {
            return response()->json(['message' => 'No confirmed resit exams found.'], 404);
        }
    
        // جلب تفاصيل الامتحانات فقط للكورسات التي تحتوي على تفاصيل امتحانات
        $coursesWithDetails = Course::with(['examDetails' => function ($query) {
            $query->whereNotNull('announcement_text'); // تحقق من وجود تفاصيل الامتحانات
        }, 'instructor'])
        ->whereIn('id', $resitCourseIds)
        ->get()
        ->filter(function ($course) {
            // التأكد من أن الكورس يحتوي على تفاصيل امتحانات
            return $course->examDetails->isNotEmpty();
        });
    
        // إذا لم تكن هناك أي كورسات تحتوي على تفاصيل امتحانات
        if ($coursesWithDetails->isEmpty()) {
            return response()->json(['message' => 'No exam details found for your confirmed resit courses.'], 404);
        }
    
        // بناء هيكل البيانات ليشمل تفاصيل الإعلانات للكورس الواحد
        $response = $coursesWithDetails->map(function ($course) {
            return [
                'course' => [
                    'id' => $course->id,
                    'name' => $course->course_name,
                    'instructor_name' => $course->instructor->name ?? 'Unknown',
                    'course_name' => $course->course_name,
                    'announcements' => $course->examDetails->map(function ($detail) {
                        return [
                            'date' => $detail->created_at->format('Y-m-d'),
                            'text' => $detail->announcement_text,
                        ];
                    })->values(), // reset array keys
                ]
            ];
        });
    
        return response()->json([
            'success' => true,
            'data' => $response
        ]);
    }
    

    public function show($course_id)
    {
        $student = Student::where('user_id', auth()->id())->first();
    
        if (!$student) {
            return response()->json(['message' => 'Student not found!'], 404);
        }
    
        $resitExam = ResitExam::where('student_id', $student->id)
                            ->where('course_id', $course_id)
                            ->first();
    
        if (!$resitExam) {
            return response()->json(['message' => 'You have not confirmed a resit for this course.'], 404);
        }
    
        $course = Course::with(['instructor', 'examDetails' => function ($query) {
            $query->orderBy('created_at', 'desc');
        }])->find($course_id);
    
        if (!$course || $course->examDetails->isEmpty()) {
            return response()->json(['message' => 'No exam details found for this course.'], 404);
        }
    
        $response = [
            'course' => [
                'id' => $course->id,
                'name' => $course->name,
                'instructor_name' => $course->instructor->name ?? 'Unknown',
                'announcements' => $course->examDetails->map(function ($detail) {
                    return [
                        'date' => $detail->created_at->format('Y-m-d'),
                        'text' => $detail->announcement_text,
                    ];
                })->values(), // Important to reset the array keys
            ]
        ];
    
        return response()->json($response);
    }
    
}