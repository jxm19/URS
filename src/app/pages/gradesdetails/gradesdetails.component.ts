import { Component, OnInit } from '@angular/core';
import { StudentnavbarComponent } from '../../layout/studentnavbar/studentnavbar.component';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-gradesdetails',
  standalone: true,
  imports: [StudentnavbarComponent, CommonModule],
  templateUrl: './gradesdetails.component.html',
  styleUrls: ['./gradesdetails.component.css']
})
export class GradesdetailsComponent implements OnInit {
  grades: any[] = [];
  StudentName: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.StudentName = localStorage.getItem('student_name') || 'Unknown Student';
    this.getGradesDetails();
  }

  getGradesDetails() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any>("http://127.0.0.1:8000/api/site-student/grades", { headers })
      .subscribe({
        next: (result) => {
          this.grades = result.data?.courses?.map((course: any) => ({
            id: course.course_id,
            course_code: course.course_code,
            course_name: course.course_name,
            final: course.final_grade,
            resit: course.resit_exam_grade,
            letterGrade: course.letter_grade,
            status: course.final_grade === null || course.final_grade === undefined ? 
                   '--' : 
                   (course.status === 'passed' ? 'Passed' : 'Failed')
          })) || [];
        },
        error: (err) => {
          console.error('Error loading grades:', err);
        }
      });
  }
}