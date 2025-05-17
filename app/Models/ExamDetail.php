<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExamDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'course_id',
        'instructor_id',
        'announcement_title',
        'announcement_text',
    ];
    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}
