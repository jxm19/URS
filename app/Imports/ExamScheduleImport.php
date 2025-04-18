<?php

namespace App\Imports;

use App\Models\ExamSchedule;
use App\Models\Course;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ExamScheduleImport implements ToModel, WithHeadingRow
{
    protected $errors;

    public function __construct(&$errors)
    {
        // Pass the reference to the errors array
        $this->errors = &$errors;
    }
    
    public function model(array $row)
    {
        $course = Course::find($row['course_id']);

        if (!$course) {
            // Optionally handle missing course
            return null;
        }


 // Check if an exam schedule already exists for this course
 if (ExamSchedule::where('course_id', $row['course_id'])->exists()) {
    // Collect error for duplicates
    $this->errors[] = "The course with ID {$row['course_id']} already has an exam scheduled.";
    return null; // Skip this row
}


        return new ExamSchedule([
            'course_id' => $row['course_id'],
            'exam_date' => $row['exam_date'],
            'exam_time' => $row['exam_time'],
            'classroom' => $row['classroom'],
        ]);
    }
    protected function addError($message)
    {
        // Store the error message (you could also store it in a session or elsewhere)
        // Assuming this function is called within a context where you can access the error collection
        $errors[] = $message;
    }
}

