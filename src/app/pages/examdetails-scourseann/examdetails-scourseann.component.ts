import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentnavbarComponent } from '../../layout/studentnavbar/studentnavbar.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-examdetails-scourseann',
  standalone: true,
  imports: [CommonModule, FormsModule, StudentnavbarComponent],
  templateUrl: './examdetails-scourseann.component.html',
  styleUrl: './examdetails-scourseann.component.css'
})
export class ExamdetailsScourseannComponent {
  StudentName: string = 'Unknown Student';
  announcements: any[] = [];
  instructorName: string = 'Instructor';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const name = localStorage.getItem('student_name');
      if (name) this.StudentName = name;
      this.loadExamDetails();
    }
  }

  private loadExamDetails() {
    if (!isPlatformBrowser(this.platformId)) return;

    const token = localStorage.getItem('token');
    const courseId = this.route.snapshot.paramMap.get('course_id');
    
    if (token && courseId) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      this.http.get<any>(
        `http://127.0.0.1:8001/api/student/exam-details/${courseId}`,
        { headers }
      ).subscribe({
        next: (res) => {
          if (res.course?.announcements?.length > 0) {
            this.instructorName = res.course.instructor_name || 'Instructor';
            this.announcements = res.course.announcements.map((ann: any) => ({
              course: {
                instructor: {
                  name: res.course.instructor_name || 'Instructor'
                }
              },
              announcement_text: ann.text,
              created_at: ann.date,
              updated_at: ann.date
            }));
          }
        },
        error: (err) => {
          console.error('API Error:', err);
        }
      });
    }
  }
}