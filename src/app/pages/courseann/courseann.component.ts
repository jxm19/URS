import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { InstructornavbarComponent } from '../../layout/instructornavbar/instructornavbar.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-courseann',
  templateUrl: './courseann.component.html',
  styleUrls: ['./courseann.component.css'],
  standalone: true,
  imports: [CommonModule, InstructornavbarComponent]
})
export class CourseannComponent implements OnInit {
  examId!: number;
  announcement: any = null;
  instructorName: string = 'Loading...';

  private platformId = inject(PLATFORM_ID);

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.examId = +this.route.snapshot.paramMap.get('id')!;
    this.fetchExamDetail();
  }

  fetchExamDetail(): void {
    // Only use localStorage if on browser platform
    if (!isPlatformBrowser(this.platformId)) {
      console.warn('Not running in browser, skipping fetchExamDetail.');
      return;
    }

    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token not found, redirecting to login');
      this.router.navigate(['/login']);
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get(`http://127.0.0.1:8000/api/dashboard-instructor/exam-details/${this.examId}`, { headers })
      .subscribe({
        next: (data: any) => {
          this.announcement = data;

          if (data?.course?.instructor?.name) {
            this.instructorName = data.course.instructor.name;
          } else {
            this.instructorName = 'Instructor not found';
          }
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error fetching exam detail:', err);
          if (err.status === 401) {
            this.router.navigate(['/login']);
          }
          this.instructorName = 'Unknown Instructor';
        }
      });
  }
}
