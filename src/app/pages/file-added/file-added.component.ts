import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InstructornavbarComponent } from '../../layout/instructornavbar/instructornavbar.component';

@Component({
  selector: 'app-file-added',
  imports: [CommonModule, FormsModule, InstructornavbarComponent],
  templateUrl: './file-added.component.html',
  styleUrl: './file-added.component.css'
})
export class FileAddedComponent {

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


  

  showSuccessPopupp = false;

  Upload() {
    this.showSuccessPopupp = true;
  }


  closeSuccessPopupp() {
    this.showSuccessPopupp = false;
    document.body.classList.remove('modal-open');
  }

}
