import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-upload',
  imports: [CommonModule, FormsModule,],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {
  file: File | null = null;
  progress = 0;
  uploadSuccess: boolean = false;
  uploadMessage: string = '';

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
    if (this.file) {
      this.startUpload();
    }
  }

  startUpload() {
    if (!this.file) return;
    let progressInterval = setInterval(() => {
      if (this.progress < 100) {
        this.progress += 10; // زيادة النسبة
      } else {
        clearInterval(progressInterval);
        this.uploadSuccess = true;
        this.uploadMessage = 'Uploaded successfully';
      
      }
    }, 500);
  }


  cancelUpload() {
    this.file = null;
    this.progress = 0;
    this.uploadSuccess = false;
    this.uploadMessage = '';
  }


  uploadFile() {
    alert(`Uploading ${this.file?.name}`);
  }


  closeUpload() {
    this.file = null;
    this.progress = 0;
    this.uploadSuccess = false;
    this.uploadMessage = '';
  }
  deleteFile() {
    this.file = null;
    this.progress = 0;
    this.uploadSuccess = false;
    this.uploadMessage = '';
  }

  

}
