import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FcnavbarComponent } from '../../layout/fcnavbar/fcnavbar.component';

@Component({
  selector: 'app-uploadfiles',
  imports: [FcnavbarComponent,CommonModule],
  templateUrl: './uploadfiles.component.html',
  styleUrl: './uploadfiles.component.css',
  standalone:true

})
export class UploadfilesComponent {


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