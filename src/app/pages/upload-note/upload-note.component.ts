import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InstructornavbarComponent } from '../../layout/instructornavbar/instructornavbar.component';

@Component({
  selector: 'app-upload-note',
  standalone: true,
  imports: [CommonModule, FormsModule, InstructornavbarComponent, RouterModule],
  templateUrl: './upload-note.component.html',
  styleUrls: ['./upload-note.component.css']
})
export class UploadNoteComponent implements OnInit {
  title: string = '';
  notes: string = '';
  showPopup = false;
  showSuccessPopup = false;
  showErrorPopup = false;

  courseId!: number;
  instructorName: string = 'Loading...';
  courses: any[] = [];

  private coursesApiUrl = 'http://127.0.0.1:8001/api/dashboard-instructor/courses'; // Updated API URL

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.courseId = Number(this.activatedRoute.snapshot.paramMap.get('courseId'));

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found, please log in.');
      this.router.navigate(['/login']);
      return;
    }

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    this.http.get<any>(this.coursesApiUrl, { headers }).subscribe({
      next: (response) => {
        const data = response?.data;
        if (data) {
          this.instructorName = data.name || 'Unknown Instructor';
          this.courses = data.courses || [];
        } else {
          this.instructorName = 'Unknown Instructor';
          this.courses = [];
        }
      },
      error: (err) => {
        console.error('Error fetching instructor and courses:', err);
        this.instructorName = 'Unknown Instructor';
        this.courses = [];
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

  closeErrorPopup() {
    this.showErrorPopup = false;
    document.body.classList.remove('modal-open');
  }

  confirmAttendance() {
    if (!this.title.trim() || !this.notes.trim()) {
      this.showErrorPopup = true;
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found, please log in.');
      this.router.navigate(['/login']);
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const examDetailData = {
      course_id: this.courseId,
      announcement_title: this.title,
      announcement_text: this.notes
    };

    // Use your existing exam-details API for posting
    this.http.post('http://127.0.0.1:8001/api/dashboard-instructor/exam-details', examDetailData, { headers }).subscribe({
      next: (response) => {
        console.log('Upload successful!', response);
        this.showPopup = false;
        this.showSuccessPopup = true;

        setTimeout(() => {
          this.showSuccessPopup = false;
          this.router.navigate([`/exam-details/${this.courseId}`]);
        }, 2000);
      },
      error: (error) => {
        if (error.status === 401) {
          console.error('Unauthorized. Redirecting to login...');
          this.router.navigate(['/login']);
        } else {
          console.error('Error uploading exam details', error);
          this.showErrorPopup = true;
        }
      }
    });
  }

  closeSuccessPopup() {
    this.showSuccessPopup = false;
    document.body.classList.remove('modal-open');
  }
}
