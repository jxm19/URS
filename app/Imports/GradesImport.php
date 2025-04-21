<?php

namespace App\Imports;

use App\Models\Grade;
use App\Models\Course;
use App\Models\Student;
use App\Models\Instructor; 
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow; 

class GradesImport implements ToModel, WithHeadingRow
{
    
    protected $courseId;
    protected $instructorId;

    public function __construct(int $courseId, int $instructorId)
    {
        $this->courseId = $courseId;
        $this->instructorId = $instructorId;
    }

    public function model(array $row)
{
    $validator = Validator::make($row, [
        'student_id' => 'required|integer|exists:students,id',
        'final_grade' => 'required|numeric|min:0|max:100',
        'absenteeism' => 'nullable|integer|min:0',
        'letter_grade' => 'required|string',
    ]);

    if ($validator->fails()) {
        throw ValidationException::withMessages($validator->errors()->toArray());
    }

    $studentId = $row['student_id'];
    $finalGrade = $row['final_grade'];
    $absenteeism = $row['absenteeism'] ?? 0;
    $letterGrade = strtoupper(trim($row['letter_grade'])); 


    $student = Student::find($studentId);
    if (!$student || !$student->courses->contains($this->courseId)) {
        throw ValidationException::withMessages(['student_id' => 'Student is not enrolled in this course.']);
    }

    $instructor = Instructor::find($this->instructorId);
    if (!$instructor || !$instructor->courses->contains($this->courseId)) {
        throw ValidationException::withMessages(['instructor_id' => 'Instructor does not teach this course.']);
    }


    $validLetterGrades = ['AA', 'BA', 'BB', 'CB', 'CC', 'DC', 'DD', 'FD', 'FF', 'DZ'];
    if (!in_array($letterGrade, $validLetterGrades)) {
        throw ValidationException::withMessages(['letter_grade' => 'Invalid letter grade value.']);
    }

    $status = in_array($letterGrade, ['FD', 'FF', 'DZ']) ? 'failed' : 'passed';

    $grade = Grade::updateOrCreate(
        [
            'student_id' => $studentId,
            'course_id' => $this->courseId,
        ],
        [
            'final_grade' => $finalGrade,
            'absenteeism' => $absenteeism,
            'letter_grade' => $letterGrade,
            'status' => $status,
        ]
    );

    return $grade;
}
}