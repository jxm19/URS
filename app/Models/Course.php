<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Traits\FormatDates;

class Course extends Model
{
    use HasFactory , FormatDates;

    protected $fillable =[ 'course_code', 'course_name', 'instructor_id'];

    public function students()
    {
        return $this->belongsToMany(Student::class,'student_course_pivot');
    }

    public function instructor()
    {
        return $this->belongsTo(Instructor::class);
    }
    public function examSchedules()
{
    return $this->hasMany(ExamSchedule::class);
}


    public function examDetails()
    {
        return $this->hasMany(ExamDetail::class);
    }
}
