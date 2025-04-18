<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExamSchedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'course_id',
        'exam_date',
        'exam_time',
        'classroom',
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}

