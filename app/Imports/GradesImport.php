<?php

namespace App\Imports;

use App\Models\Grade;
use App\Models\Course;
use App\Models\Student;
use App\Models\Instructor; 
use App\Models\ResitExam;
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
        'student_id' => ['required', 'digits:9', 'exists:students,student_id'],
        'final_grade' => 'required|numeric|min:0|max:100',
        'absenteeism' => 'nullable|integer|min:0',
        'letter_grade' => 'required|string',
        'resit_exam_grade' => 'nullable|numeric|min:0|max:100',
    ]);

    if ($validator->fails()) {
        throw ValidationException::withMessages($validator->errors()->toArray());
    }

    $student = Student::where('student_id', $row['student_id'])->first();
    if (!$student || !$student->courses->contains($this->courseId)) {
        throw ValidationException::withMessages(['student_id' => 'Student is not enrolled in this course.']);
    }

    $instructor = Instructor::find($this->instructorId);
    if (!$instructor || !$instructor->courses->contains($this->courseId)) {
        throw ValidationException::withMessages(['instructor_id' => 'Instructor does not teach this course.']);
    }

    $letterGrade = strtoupper(trim($row['letter_grade']));
    $validLetterGrades = ['AA', 'BA', 'BB', 'CB', 'CC', 'DC', 'DD', 'FD', 'FF', 'DZ'];
    if (!in_array($letterGrade, $validLetterGrades)) {
        throw ValidationException::withMessages(['letter_grade' => 'Invalid letter grade value.']);
    }

    $finalGrade = $row['final_grade'];
    $absenteeism = $row['absenteeism'] ?? 0;
    $resitExamGrade = $row['resit_exam_grade'] ?? null;
    $status = in_array($letterGrade, ['FD', 'FF', 'DZ']) ? 'failed' : 'passed';

    $existingGrade = Grade::where('student_id', $student->id)
                          ->where('course_id', $this->courseId)
                          ->first();

    if ($existingGrade && is_null($resitExamGrade)) {
        // Prevent overwriting existing final grades if no resit exam grade is being imported
        throw ValidationException::withMessages([
            'student_id' => 'Final grade already exists for this student in this course. Importing final grade again is not allowed unless updating with a resit exam grade.'
        ]);
    }

    if (!is_null($resitExamGrade)) {
        $resitExam = ResitExam::where('student_id', $student->id)
            ->where('course_id', $this->courseId)
            ->first();

        if (!$resitExam) {
            throw ValidationException::withMessages([
                'resit_exam_grade' => 'Student is not registered for resit exam in this course.'
            ]);
        }
    }

    // Save or update the grade
    return Grade::updateOrCreate(
        ['student_id' => $student->id, 'course_id' => $this->courseId],
        [
            'final_grade' => $finalGrade,
            'absenteeism' => $absenteeism,
            'letter_grade' => $letterGrade,
            'status' => $status,
            'resit_exam_grade' => $resitExamGrade,
        ]
    );
}

}