import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './upload-sec.component.html',
  styleUrl: './upload-sec.component.css'
})
export class UploadSecComponent implements OnInit {
  file: File | null = null;
  progress = 0;
  uploadSuccess = false;
  uploadMessage = '';
  examSchedules: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file) {
      this.file = file;
    }
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  startUpload() {
    if (!this.file) {
      this.uploadMessage = 'Please select a file first.';
      return;
    }

    this.uploadMessage = '';
    this.progress = 0;
    this.uploadSuccess = false;

    const formData = new FormData();
    formData.append('file', this.file);

    const token = localStorage.getItem('token');
    if (!token) {
      this.uploadMessage = 'Authentication token missing';
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.post('http://localhost:8000/api/exam-schedules/import', formData, {
      headers,
      reportProgress: true,
      observe: 'events'
    }).subscribe({
      next: (event: HttpEvent<any>) => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          this.progress = Math.round((event.loaded / event.total) * 100);
        } else if (event.type === HttpEventType.Response) {
          this.progress = 100;
        
          const response = event.body;
        
          if (response.status === 'success') {
            this.uploadSuccess = true;
            this.uploadMessage = response.message || 'File uploaded and data imported successfully.';
            this.fetchExamSchedules();
          } else {
            this.uploadSuccess = false;
            this.uploadMessage = response.message || 'Import failed.';
        
            if (response.details && Array.isArray(response.details)) {
              this.uploadMessage += '\n' + response.details.join('\n');
            }
          }
        }
        
      },
      error: (err) => {
        console.error('Upload Error:', err);
        this.uploadMessage = err?.error?.message || 'Upload failed due to a server error';
        this.uploadSuccess = false;
      }
    });
  }

  fetchExamSchedules() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any>('http://localhost:8000/api/exam-schedules', { headers }).subscribe({
      next: (res) => {
        this.examSchedules = res.data;
      },
      error: (err) => {
        console.error('Error fetching exam schedules:', err);
        this.uploadMessage = 'File uploaded, but failed to fetch schedules.';
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
