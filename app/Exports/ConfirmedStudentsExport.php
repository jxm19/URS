<?php

// app/Exports/ConfirmedStudentsExport.php

namespace App\Exports;

use App\Models\ResitExam;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class ConfirmedStudentsExport implements FromCollection, WithHeadings
{
    protected $courseId;
    protected $instructorId;

    public function __construct($courseId, $instructorId)
    {
        $this->courseId = $courseId;
        $this->instructorId = $instructorId;
    }

    public function collection()
    {
        return ResitExam::with(['student.user', 'grade', 'course'])
            ->where('course_id', $this->courseId)
            ->get()
            ->filter(function ($resit) {
                return $resit->course->instructor_id == $this->instructorId;
            })
            ->map(function ($resit) {
                return [
                    'Student ID' => $resit->student->student_id,
                    'Student Name' => $resit->student->user->name ?? 'N/A',
                    'Letter Grade' => $resit->grade->letter_grade ?? 'N/A',
                    'Confirmed At' => $resit->confirmed_at,
                ];
            });
    }

    public function headings(): array
    {
        return [
            'Student ID',
            'Student Name',
            'Letter Grade',
            'Confirmed At',
        ];
    }
}

