<?php

namespace App\Http\Controllers\DashboardInstructor;

use App\Http\Controllers\Controller;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\GradesImport;
use Illuminate\Http\Request;
use App\Models\Grade;
use App\Models\Course;
use App\Models\Student;
use App\Models\Instructor;
use App\Traits\ApiResponse;
use Illuminate\Support\Facades\Validator;

class GradeController extends Controller
{
    use ApiResponse;

    public function store(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'student_id' => 'required|exists:students,id',
            'course_id' => 'required|exists:courses,id',
            'final_grade' => 'required|numeric|min:0|max:100',
            'absenteeism' => 'nullable|integer|min:0',
        ]);
    
        if ($validate->fails()) {
            return response()->json(['errors' => $validate->errors()], 422);
        }
    
        $instructor = Instructor::where('user_id', auth()->id())->first();
        if (!$instructor) {
            return response()->json(['error' => 'Instructor not found!'], 404);
        }
    
        $course = $instructor->courses->where('id', $request->course_id)->first();
        if (!$course) {
            return response()->json(['error' => 'Course not found or you are not authorized to add grades for this course.'], 403);
        }
    
        $student = Student::find($request->student_id);
        if (!$student->courses->contains($course)) {
            return response()->json(['error' => 'This student is not enrolled in this course.'], 403);
        }
    
        $existingGrade = Grade::where('student_id', $request->student_id)
                              ->where('course_id', $request->course_id)
                              ->first();
        if ($existingGrade) {
            return response()->json(['error' => 'Grade already exists for this student in this course.'], 409);
        }
    
        $grade = new Grade($request->all());
        $grade->calculateGrade(); 
        $grade->save();
    
        return $this->success(['message' => 'Grade added successfully!', 'grade' => $grade], 201);
    }
    
    public function update(Request $request, $id)
    {
        $validate = Validator::make($request->all(), [
            'final_grade'       => 'required|numeric|min:0|max:100',
            'absenteeism'       => 'nullable|integer|min:0',
            'resit_exam_grade'  => 'nullable|numeric|min:0|max:100',
            'letter_grade'      => 'required|string|max:2', // You can customize this rule further
        ]);
    
        if ($validate->fails()) {
            return response()->json(['errors' => $validate->errors()], 422);
        }
    
        $instructor = Instructor::where('user_id', auth()->id())->first();
    
        if (!$instructor) {
            return response()->json(['error' => 'Instructor not found!'], 404);
        }
    
        $grade = Grade::find($id);
    
        if (!$grade) {
            return response()->json(['error' => 'Grade not found.'], 404);
        }
    
        $course = $instructor->courses->where('id', $grade->course_id)->first();
    
        if (!$course) {
            return response()->json(['error' => 'You are not authorized to update grades for this course.'], 403);
        }
    
        $grade->final_grade       = $request->final_grade;
        $grade->absenteeism = $request->absenteeism ?? 0;
        $grade->resit_exam_grade  = $request->resit_exam_grade;
        $grade->letter_grade      = $request->letter_grade;
    
        // Optional: Recalculate status based on grades if needed
        // $grade->calculateStatus();
    
        $grade->save();
    
        $grade->load(['student:id,student_id,name', 'course:id,course_name,course_code']);
    
        return response()->json([
            'error' => false,
            'message' => 'Grade updated successfully!',
            'data' => [
                'student_db_id'     => $grade->student_id,
                'student_code'      => $grade->student->student_id,
                'student_name'      => $grade->student->name,
                'course_name'       => $grade->course->course_name,
                'course_code'       => $grade->course->course_code,
                'final_grade'       => $grade->final_grade,
                'resit_exam_grade'  => $grade->resit_exam_grade,
                'letter_grade'      => $grade->letter_grade,
                'absenteeism'       => $grade->absenteeism,
                'status'            => $grade->status,
            ]
        ]);
    }
    
    public function show($id)
    {
        $instructor = Instructor::where('user_id', auth()->id())->first();
        if (!$instructor) {
            return response()->json(['error' => 'Instructor not found!'], 404);
        }

        $grade = Grade::find($id);
        if (!$grade) {
            return response()->json(['error' => 'Grade not found!'], 404);
        }

        $course = $instructor->courses->where('id', $grade->course_id)->first();
        if (!$course) {
            return response()->json(['error' => 'You are not authorized to view grades for this course.'], 403);
        }

        $grade->load(['student:id,student_id,name', 'course:id,course_name,course_code']);
        return $this->success(['grade' => $grade]);

    }
    
        public function index($courseId)
    {
        $instructor = Instructor::where('user_id', auth()->id())->first();
        if (!$instructor) {
            return response()->json(['error' => 'Instructor not found!'], 404);
        }

        $course = $instructor->courses()->where('id', $courseId)->first();
        if (!$course) {
            return response()->json(['error' => 'You are not authorized to view grades for this course.'], 403);
        }

        $grades = Grade::where('course_id', $courseId)
                    ->with(['student:id,student_id,name', 'course:id,course_name,course_code'])
                    ->get();

        return $this->success(['grades' => $grades]);
    }


        public function destroy($id)
    {
        $instructor = Instructor::where('user_id', auth()->id())->first();

        if (!$instructor) {
            return response()->json(['error' => 'Instructor not found!'], 404);
        }

        $grade = Grade::find($id);

        if (!$grade) {
            return response()->json(['error' => 'Grade not found!'], 404);
        }

        $course = $instructor->courses->where('id', $grade->course_id)->first();
        if (!$course) {
            return response()->json(['error' => 'You are not authorized to delete grades for this course.'], 403);
        }

        $grade->delete();

        return $this->success(['message' => 'Grade deleted successfully!']);
    }


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    public function import(Request $request)
    {
        $request->validate([
            'grades_file' => 'required|file|mimes:xlsx,xls,csv',
            'course_id' => 'required|exists:courses,id',
        ]);
    
        $file = $request->file('grades_file');
        $courseId = $request->input('course_id');
    
        $instructor = Instructor::where('user_id', auth()->id())->first();
        if (!$instructor) {
            return response()->json(['error' => 'Instructor not found!'], 404);
        }
    
        $instructorId = $instructor->id;
    
        try {
            Excel::import(new GradesImport($courseId, $instructorId), $file);
            return response()->json(['message' => 'Grades uploaded and processed successfully.']);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Error processing file: ' . $e->getMessage()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error processing file: ' . $e->getMessage()], 500);
        }
    }


    public function destroyByCourse($courseId)
{
    $instructor = Instructor::where('user_id', auth()->id())->first();

    if (!$instructor) {
        return response()->json(['error' => 'Instructor not found!'], 404);
    }

    $course = $instructor->courses()->where('id', $courseId)->first();

    if (!$course) {
        return response()->json(['error' => 'You are not authorized to delete grades for this course.'], 403);
    }

    Grade::where('course_id', $courseId)->delete();

    return response()->json([
        'message' => 'All grades for this course deleted successfully.'
    ], 200);
}

}