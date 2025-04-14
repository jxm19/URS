<?php

namespace App\Http\Controllers\SiteStudent;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ResitExam;
use App\Models\Student;
use App\Models\Course;
use App\Models\Grade;
use App\Traits\ApiResponse;

class ResitExamController extends Controller
{
    use ApiResponse;

    public function confirm(Request $request)
    {
        $request->validate([
            'course_id' => 'required|exists:courses,id',
        ]);
        
        $grade = Grade::where('student_id', auth()->user()->student->id)
                    ->where('course_id', $request->course_id)
                    ->first();
        
        if (!$grade || !$grade->letter_grade) {
            return response()->json([
                'message' => 'Grade not found or letter grade is missing for this course.',
            ], 400);  
        }

        if ($grade->letter_grade === 'AA' || $grade->letter_grade === 'DZ') {
            return response()->json([
                'message' => 'You do not need to confirm resit because your grade is either AA or DZ.',
            ], 400); 
        }

        $existingResit = ResitExam::where('student_id', auth()->user()->student->id)
            ->where('course_id', $request->course_id)
            ->where('grade_id', $grade->id)
            ->first();
        
        if ($existingResit) {
            return response()->json([
                'message' => 'Resit exam already confirmed for this student and course.',
            ], 400);
        }

        $confirmation = ResitExam::create([
            'student_id' => auth()->user()->student->id,
            'course_id' => $request->course_id,
            'grade_id' => $grade->id,
            'confirmed_at' => now(),
        ]);
        
        return response()->json([
            'message' => 'Resit confirmed successfully.',
            'data' => $confirmation
        ]);
    }

    public function index()
    {
        $student = Student::where('user_id', auth()->id())->first();
    
        if (!$student) {
            return response()->json(['message' => 'Student not found!'], 404);
        }
    
        $resitExams = ResitExam::with('course')
            ->where('student_id', $student->id)
            ->get();
    
        if ($resitExams->isEmpty()) {
            return response()->json(['message' => 'No resit exams found for this student.'], 404);
        }
    
        $data = $resitExams->map(function ($exam) {
            return [
                'resit_exam_id' => $exam->id,
                'course_code' => $exam->course->course_code,
                'course_name' => $exam->course->course_name,
                'status' => 'confirmed',
            ];
        });
    
        return response()->json($data);
    }
    


    public function destroy($id)
    {
        $student = Student::where('user_id', auth()->id())->first();
    
        if (!$student) {
            return response()->json(['message' => 'Student not found!'], 404);
        }
    
        $resitExam = ResitExam::where('id', $id)
                              ->where('student_id', $student->id)
                              ->first();
    
        if (!$resitExam) {
            return response()->json(['message' => 'Resit exam not found for this student.'], 404);
        }
    
        $resitExam->delete();
    
        return response()->json(['message' => 'Resit exam confirmation deleted successfully.']);
    }
    
}    