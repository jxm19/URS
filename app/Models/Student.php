<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Traits\FormatDates;

class Student extends Model
{
    use HasFactory , FormatDates;
    
    protected $fillable =[ 'name', 'student_id', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function courses()
    {
        return $this->belongsToMany(Course::class,'student_course_pivot');
    }
    
    public function grades()
    {
        return $this->hasMany(Grade::class);
    }
    
}
