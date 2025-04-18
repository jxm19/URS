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
}
