import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InstructornavbarComponent } from '../../layout/instructornavbar/instructornavbar.component';

@Component({
  selector: 'app-upload-note',
  standalone: true,
  imports: [CommonModule, FormsModule, InstructornavbarComponent],
  templateUrl: './upload-note.component.html',
  styleUrls: ['./upload-note.component.css']
})
export class UploadNoteComponent {
  title: string = '';
  notes: string = '';

  
  showPopup = false;
  showSuccessPopup = false;
  
  openPopup() {
    this.showPopup = true;
    document.body.classList.add('modal-open');
  }
  
  closePopup() {
    console.log("Close button clicked");
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
  
}
