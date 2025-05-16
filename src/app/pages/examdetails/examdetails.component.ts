import { Component, OnInit } from '@angular/core';
import { StudentnavbarComponent } from '../../layout/studentnavbar/studentnavbar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-examdetails',
  standalone: true,
  imports: [StudentnavbarComponent, CommonModule, RouterModule],
  templateUrl: './examdetails.component.html',
  styleUrl: './examdetails.component.css'
})
export class ExamdetailsComponent implements OnInit {
  StudentName: string = '';
  courses: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadStudentName();
    this.loadExamDetails();
  }

  private loadStudentName(): void {
    if (typeof localStorage !== 'undefined') {
      this.StudentName = localStorage.getItem('student_name') || 'Unknown Student';
    }
  }

  private loadExamDetails(): void {
    const token = localStorage.getItem('token');
    if (!token) return;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any>('http://127.0.0.1:8001/api/student/exam-details', { headers })
      .subscribe({
        next: (response) => {
          if (response.success && response.data) {
            // تحويل الكائن إلى مصفوفة
            this.courses = Object.values(response.data).map((item: any) => ({
              course: {
                id: item.course.id,
                name: item.course.name,
                course_name: item.course.course_name,
                instructor_name: item.course.instructor_name,
                announcements: item.course.announcements
              }
            }));
          }
        },
        error: (err) => {
          console.error('Error loading Exam Details:', err);
          this.courses = [];
        }
      });
  }
}