import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent implements OnInit {
  file: File | null = null;
  progress = 0;
  uploadSuccess = false;
  uploadMessage = '';
  courseId!: number;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('courseId');
    if (id) {
      this.courseId = +id;
      console.log('Course ID from URL:', this.courseId);
    } else {
      console.warn('No courseId found in URL');
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file) {
      this.file = file;
      // لا تبدأ الرفع تلقائياً
    }
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    console.log('Selected file:', this.file);
    // لا تبدأ الرفع تلقائياً
  }

  startUpload() {
    if (!this.file) {
      this.uploadMessage = 'Please select a file first.';
      return;
    }

    if (this.courseId === undefined || this.courseId === null) {
      this.uploadMessage = 'Course ID is missing. Please access this page correctly.';
      return;
    }

    this.uploadMessage = '';
    this.progress = 0;
    this.uploadSuccess = false;

    const formData = new FormData();
    formData.append('grades_file', this.file);
    formData.append('course_id', this.courseId.toString());

    const token = localStorage.getItem('token');
    if (!token) {
      this.uploadMessage = 'Authentication token missing';
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.post('http://localhost:8000/api/dashboard-instructor/import-grades', formData, {
      headers,
      reportProgress: true,
      observe: 'events'
    }).subscribe({
      next: (event: HttpEvent<any>) => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total) {
            this.progress = Math.round((event.loaded / event.total) * 100);
            console.log(`Uploaded ${event.loaded} of ${event.total} bytes (${this.progress}%)`);
          } else {
            this.progress = 0;
            console.log(`Uploaded ${event.loaded} bytes (total size unknown)`);
          }
        } else if (event.type === HttpEventType.Response) {
          this.progress = 100;
          this.uploadSuccess = true;
          this.uploadMessage = 'Uploaded successfully';
          setTimeout(() => {
            this.router.navigate(['/file-added']);
          }, 700); // 0.7 ثانية تأخير قبل التنقل
        }
      },
      error: (err) => {
        console.error('Upload Error:', err);
        if (err.error instanceof ProgressEvent) {
          this.uploadMessage = 'File upload failed. Please try again.';
        } else {
          this.uploadMessage = err?.error?.message || err?.message || 'Upload failed due to a server error';
        }
        this.uploadSuccess = false;
      }
    });
  }

  cancelUpload() {
    this.file = null;
    this.progress = 0;
    this.uploadSuccess = false;
    this.uploadMessage = '';
  }

  deleteFile() {
    this.cancelUpload();
  }

  closeUpload() {
    this.cancelUpload();
  }

  uploadFile() {
    this.startUpload();
  }
}
