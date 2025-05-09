import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {
  file: File | null = null;
  progress = 0;
  uploadSuccess = false;
  uploadMessage = '';
  courseId: number = 1; // or bind this to a select dropdown

  constructor(private http: HttpClient, private router: Router) {}

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file) {
      this.file = file;
      this.startUpload();
    }
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    console.log('Selected file:', this.file); // Debug

    if (this.file) {
      this.startUpload();
    }
  }

  startUpload() {
    if (!this.file) return;
    console.log('Uploading:', this.file); // ✅ Check here


    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('course_id', this.courseId.toString());
    
    const token = localStorage.getItem('token'); // or from service if stored elsewhere


    this.http.post('http://localhost:8000/api/dashboard-instructor/import-grades', formData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe({
      next: (event: HttpEvent<any>) => {
        console.log('Event:', event); // ✅ Debug log

        if (event.type === HttpEventType.UploadProgress && event.total) {
          this.progress = Math.round((event.loaded / event.total) * 100);
        } else if (event.type === HttpEventType.Response) {
          this.uploadSuccess = true;
          this.uploadMessage = 'Uploaded successfully';
          console.log('Response:', event.body); // ✅ Debug success

          this.router.navigate(['/file-added']); 
        }
      },
      error: (err) => {
        console.error('Upload failed:', err); // ✅ See if backend rejects it
        this.uploadMessage = 'Upload failed';
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
    if (this.file) {
      this.startUpload();
    }
  }
} 