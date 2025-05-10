import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InstructornavbarComponent } from '../../layout/instructornavbar/instructornavbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';


@Component({
  selector: 'app-exam-details',
  standalone: true,
  imports: [CommonModule, FormsModule, InstructornavbarComponent, RouterModule],
  templateUrl: './exam-details.component.html',
  styleUrls: ['./exam-details.component.css']
})
export class ExamDetailsComponent implements OnInit {
  courseId!: number;
  instructorName: string = '';
  announcements: any[] = [];

  showPopup = false;
  showSuccessPopup = false;
  showPopupp = false;
  showSuccessPopupp = false;

  constructor(private route: ActivatedRoute, private http: HttpClient, @Inject(PLATFORM_ID) private platformId: any) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('courseId');
      if (id) {
        this.courseId = +id;
        this.loadAnnouncements(this.courseId);
      }
    });
  }

  loadAnnouncements(courseId: number) {
    const token = localStorage.getItem('token');
    if (!token) {
      this.announcements = [];
      this.instructorName = 'Unknown Instructor';
      return;
    }
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    this.http.get<any>(`http://localhost:8000/api/dashboard-instructor/exam-details`, { headers })
      .subscribe({
        next: res => {
          if (res.success && Array.isArray(res.data)) {
            this.announcements = res.data.filter((item: any) => item.course_id === courseId);

            if (this.announcements.length > 0 && this.announcements[0].course?.instructor?.name) {
              this.instructorName = this.announcements[0].course.instructor.name;
            } else {
              this.instructorName = 'Unknown Instructor';
            }
          } else {
            this.announcements = [];
            this.instructorName = 'Unknown Instructor';
          }
        },
        error: err => {
          console.error('Error loading announcements', err);
          this.announcements = [];
          this.instructorName = 'Unknown Instructor';
        }
      });
  }

  openPopup() {
    this.showPopup = true;
    document.body.classList.add('modal-open');
  }

  closePopup() {
    this.showPopup = false;
    document.body.classList.remove('modal-open');
  }

  confirmAttendance() {
    this.showPopup = false;
    this.showSuccessPopup = true;
  }

  closeSuccessPopup() {
    this.showSuccessPopup = false;
    document.body.classList.remove('modal-open');
  }

  openPopupp() {
    this.showPopupp = true;
    document.body.classList.add('modal-open');
  }

  closePopupp() {
    this.showPopupp = false;
    document.body.classList.remove('modal-open');
  }

  confirmAttendancee() {
    this.showPopupp = false;
    this.showSuccessPopupp = true;
  }

  closeSuccessPopupp() {
    this.showSuccessPopupp = false;
    document.body.classList.remove('modal-open');
  }

  examData: any; // or better type if known

}
