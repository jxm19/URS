import { Component } from '@angular/core';
import { StudentnavbarComponent } from '../../layout/studentnavbar/studentnavbar.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-resitexams',
  imports: [StudentnavbarComponent,CommonModule],
  templateUrl: './resitexams.component.html',
  styleUrl: './resitexams.component.css',
  standalone:true
})
export class ResitexamsComponent {

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
  

  courses = [
    { courseCode: 'SE/302', courseName: 'Software Project Management', instructor: 'SALIM JIBRIN DANBATTA'},
    { courseCode: 'SE/202', courseName: 'Software Design Architecture', instructor: 'SALIM JIBRIN DANBATTA'},
    { courseCode: 'SE/302', courseName: 'Software Project Management', instructor: 'SALIM JIBRIN DANBATTA'},
    { courseCode: 'SE/302', courseName: 'Software Project Management', instructor: 'SALIM JIBRIN DANBATTA'}
  ];

}
