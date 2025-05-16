import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StudentnavbarComponent } from '../../layout/studentnavbar/studentnavbar.component';

@Component({
  selector: 'app-examschedule',
  standalone: true,
  imports: [CommonModule, StudentnavbarComponent],
  templateUrl: './examschedule.component.html',
  styleUrl: './examschedule.component.css'
})

export class ExamscheduleComponent implements OnInit {
  courses: any[] = [];
  StudentName: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.StudentName = localStorage.getItem('student_name') || 'Unknown Student';
    this.getExamSchedules();
  }

  getExamSchedules() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any>("http://127.0.0.1:8001/api/student/exam-schedules", { headers })
    .subscribe({
        next: (result) => {
          this.courses = result.data?.map((exam: any) => ({
            courseCode: exam.course?.course_code,
            courseName: exam.course?.course_name,
            instructor: exam.course?.instructor?.name,
            date: exam.exam_date ? this.formatDate(exam.exam_date) : '--',
            time: exam.exam_time ? this.formatTime(exam.exam_time) : '--',
            classroom: exam.classroom || '--'
          })) || [];
        },
        error: (err) => {
          console.error('Error loading exam schedules:', err);
        }
      });
  }

  private formatDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB').replace(/\//g, '.');
    } catch {
      return '--';
    }
  }

  private formatTime(timeString: string): string {
    return timeString?.split(':').slice(0, 2).join(':') || '--';
  }
}