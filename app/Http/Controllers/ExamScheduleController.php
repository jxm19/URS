<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\ExamScheduleImport;
use App\Models\ExamSchedule;
use Exception;
use Illuminate\Support\Facades\Auth; // <-- Move this line here

class ExamScheduleController extends Controller
{
    // Import exam schedules from Excel/CSV file
    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,csv|max:10240', // max file size 10MB
        ]);

        $errors = [];

        try {
            // Perform the file import
            Excel::import(new ExamScheduleImport($errors), $request->file('file'));

            if (count($errors) > 0) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'There were errors during the import.',
                    'details' => $errors,
                ]);
            }

            // Return success response
            return response()->json([
                'message' => 'File imported successfully!',
                'status' => 'success',
            ], 200);
        } catch (Exception $e) {
            // Handle any exceptions that might occur
            return response()->json([
                'message' => 'Error occurred while importing the file.',
                'status' => 'error',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    // Return all exam schedules (with related course and instructor info)
    public function index()
    {
        try {
            $schedules = ExamSchedule::with(['course.instructor'])->get();

            return response()->json([
                'success' => true,
                'data' => $schedules
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve exam schedules.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    // Return a single exam schedule by ID (with related course and instructor info)
    public function show($id)
    {
        try {
            $schedule = ExamSchedule::with(['course.instructor'])->find($id);

            if (!$schedule) {
                return response()->json([
                    'success' => false,
                    'message' => 'Exam schedule not found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $schedule
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error occurred while retrieving the exam schedule.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    // Handle the import and error collection for duplicate course IDs
    public function importExamSchedule(Request $request)
    {
        $errors = []; // To collect errors

        // Perform the file import
        try {
            // Pass errors array to ExamScheduleImport
            Excel::import(new ExamScheduleImport($errors), $request->file('file'));
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred during the import.',
                'details' => $e->getMessage(),
            ]);
        }

        // Check if there were any errors collected
        if (count($errors) > 0) {
            return response()->json([
                'status' => 'error',
                'message' => 'There were errors during the import.',
                'details' => $errors,
            ]);
        }

        // Return success message if no errors
        return response()->json([
            'status' => 'success',
            'message' => 'File imported successfully!',
        ]);
    }

    public function instructorExamSchedules()
    {
        try {
            $user = Auth::user();

            // Assuming 'user_id' is stored in 'instructors' table and matched with logged-in user
            $schedules = ExamSchedule::whereHas('course.instructor', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })->with(['course.instructor'])->get();

            return response()->json([
                'success' => true,
                'data' => $schedules
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve instructor exam schedules.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
{
    try {
        // Find the exam schedule by ID
        $schedule = ExamSchedule::find($id);

        if (!$schedule) {
            return response()->json([
                'success' => false,
                'message' => 'Exam schedule not found'
            ], 404); // Return a 404 if not found
        }

        // Delete the schedule
        $schedule->delete();

        return response()->json([
            'success' => true,
            'message' => 'Exam schedule deleted successfully'
        ], 200); // Return success response
    } catch (Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Failed to delete exam schedule.',
            'error' => $e->getMessage(),
        ], 500); // Return error response
    }
}

public function update(Request $request, $id)
{
    try {
        // Validate the input fields
        $validated = $request->validate([
            'exam_date' => 'required|date', // Correct the field name here
            'exam_time' => 'required|string', 
            'classroom' => 'required|string', 
            'course_id' => 'required|exists:courses,id',
        ]);

        // Find the schedule
        $schedule = ExamSchedule::find($id);

        if (!$schedule) {
            return response()->json([
                'success' => false,
                'message' => 'Exam schedule not found'
            ], 404);
        }

        // Update the schedule fields
        $schedule->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Exam schedule updated successfully',
            'data' => $schedule
        ], 200);

    } catch (Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Failed to update exam schedule.',
            'error' => $e->getMessage(),
        ], 500);
    }
}



}
