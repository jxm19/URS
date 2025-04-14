<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Traits\FormatDates;

class Grade extends Model
{
    use HasFactory , FormatDates;
    
    protected $fillable =[ 'student_id', 'course_id', 'final_grade','status','letter_grade','absenteeism'];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function resitExam()
    {
        return $this->hasMany(ResitExam::class);
    }

    public function calculateGrade()
    {

        $grade = $this->final_grade;

        if ($this->absenteeism > 3) {
            $this->letter_grade = 'DZ'; 
            $this->status = 'failed';
        } else {

            if ($grade >= 90) {
                $this->letter_grade = 'AA';
                $this->status = 'passed';
            } elseif ($grade >= 85) {
                $this->letter_grade = 'BA';
                $this->status = 'passed';
            } elseif ($grade >= 80) {
                $this->letter_grade = 'BB';
                $this->status = 'passed';
            } elseif ($grade >= 75) {
                $this->letter_grade = 'CB';
                $this->status = 'passed';
            } elseif ($grade >= 70) {
                $this->letter_grade = 'CC';
                $this->status = 'passed';
            } elseif ($grade >= 65) {
                $this->letter_grade = 'DC';
                $this->status = 'passed';
            } elseif ($grade >= 60) {
                $this->letter_grade = 'DD';
                $this->status = 'passed';
            } elseif ($grade >= 50) {
                $this->letter_grade = 'FD';
                $this->status = 'failed';
            } else {
                $this->letter_grade = 'FF';
                $this->status = 'failed';
            }
        }

        $this->save();
    }
}
