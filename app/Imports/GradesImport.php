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
            'student_id' => 'required',
            'final_grade' => 'required|numeric|min:0|max:100',
            'absenteeism' => 'nullable|integer|min:0',
        ]);

        if ($validator->fails()) {
            throw ValidationException::withMessages($validator->errors()->toArray());
        }

        $studentId = $row['student_id'];
        $finalGrade = $row['final_grade'];
        $absenteeism = $row['absenteeism'];

        $student = Student::find($studentId);
        if (!$student || !$student->courses->contains($this->courseId)) {
            throw ValidationException::withMessages(['student_id' => 'Student is not enrolled in this course.']);
        }

       
        $instructor = Instructor::find($this->instructorId);
        if (!$instructor || !$instructor->courses->contains($this->courseId)) {
            throw ValidationException::withMessages(['instructor_id' => 'Instructor does not teach this course.']);
        }

     
        $existingGrade = Grade::where('student_id', $studentId)
            ->where('course_id', $this->courseId)
            ->first();

        if ($existingGrade) {
            throw ValidationException::withMessages(['student_id' => 'Grade already exists for this student in this course.']);
        }

        
        $grade = new Grade([
            'student_id' => $studentId,
            'course_id' => $this->courseId,
            'final_grade' => $finalGrade,
            'absenteeism' => $absenteeism,
        ]);

        $grade->calculateGrade();

        return $grade;
        }
}
 