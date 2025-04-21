<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ExamDetail;
use Illuminate\Support\Facades\Auth;
use App\Models\Course;



class ExamDetailsController extends Controller
{
    //
    public function store(Request $request)
    {
        $request->validate([
            'course_id' => 'required|exists:courses,id', // Make sure course exists
            'announcement_text' => 'required|string|max:1000',
        ]);


///////

// Get the logged-in user
$user = Auth::user();

// Check if the user is an instructor
$instructor = $user->instructor;  // Assuming a one-to-one relationship between User and Instructor

// Eager load the courses for the instructor
$instructor->load('courses');

// Check if the instructor has any courses
if ($instructor->courses->isEmpty()) {
    return response()->json(['message' => 'Instructor is not assigned to any courses.'], 404);
}

// Find the course from the instructor's courses using the course_id
$course = $instructor->courses->where('id', $request->course_id)->first();

// Check if the course exists
if (!$course) {
    return response()->json(['message' => 'You are not authorized to make an announcement for this course.'], 404);
}

// Check if the instructor is authorized for this course
if (!$course->instructor->is($instructor)) {
    return response()->json(['message' => 'You are not authorized to make an announcement for this course.'], 403);
}




//////



        // Create a new exam detail
        $examDetail = new ExamDetail();
        $examDetail->course_id = $request->course_id;
        $examDetail->instructor_id = Auth::id();  // Get the authenticated instructor ID
        $examDetail->announcement_text = $request->announcement_text;
        $examDetail->save();

        return response()->json(['message' => 'Exam details added successfully!'], 201);
    }

    // Method to get exam details for students
    public function getExamDetails($courseId)
    {
        // Check if the student has confirmed their attendance
        $student = Auth::user();  // Assuming student is logged in
        if (!$student->confirmedAttendance($courseId)) {
            return response()->json(['message' => 'You have not confirmed attendance.'], 403);
        }

        // Retrieve the exam details for the course
        $examDetails = ExamDetail::where('course_id', $courseId)->get();

        return response()->json($examDetails);
    }


    public function index()
{
    try {
        $instructor = Auth::user()->instructor;

        if (!$instructor) {
            return response()->json([
                'success' => false,
                'message' => 'You are not an instructor.',
            ], 403);
        }

        // Get exam details for courses the instructor owns
        $examDetails = ExamDetail::with(['course.instructor'])
                            ->whereHas('course', function ($query) use ($instructor) {
                                $query->where('instructor_id', $instructor->id);
                            })
                            ->get();

        return response()->json([
            'success' => true,
            'data' => $examDetails
        ], 200);

    } catch (Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Failed to retrieve exam details.',
            'error' => $e->getMessage(),
        ], 500);
    }
}



     // Show a specific exam detail
     public function show($id)
     {
         $examDetail = ExamDetail::find($id);
 
         if (!$examDetail) {
             return response()->json(['message' => 'Exam detail not found.'], 404);
         }
 
         return response()->json($examDetail);
     }


     
     public function update(Request $request, $id)
{

    $examDetail = ExamDetail::find($id);

    if (!$examDetail) {
        return response()->json(['message' => 'Exam detail not found.'], 404);
    }

    // Only the instructor who created it can update
    if ($examDetail->instructor_id !== Auth::id()) {
        return response()->json(['message' => 'You are not authorized to update this exam detail.'], 403);
    }

    $request->validate([
        'announcement_text' => 'required|string|max:1000',
    ]);

    $examDetail->announcement_text = $request->input('announcement_text');
    $examDetail->save();

    return response()->json(['message' => 'Exam detail updated successfully!']);
}

     
     // Delete an exam detail
     public function destroy($id)
     {
         $examDetail = ExamDetail::find($id);
 
         if (!$examDetail) {
             return response()->json(['message' => 'Exam detail not found.'], 404);
         }
 
         // Only the instructor who created it can delete
         if ($examDetail->instructor_id !== Auth::id()) {
             return response()->json(['message' => 'You are not authorized to delete this exam detail.'], 403);
         }
 
         $examDetail->delete();
 
         return response()->json(['message' => 'Exam detail deleted successfully!']);
     }
}
