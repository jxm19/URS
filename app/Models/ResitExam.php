<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Traits\FormatDates;


class ResitExam extends Model
{
    use HasFactory , FormatDates;

    protected $fillable = ['student_id', 'course_id', 'confirmed_at','grade_id'];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function grade()
    {
        return $this->belongsTo(Grade::class);
    }

}
