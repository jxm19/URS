import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StudentnavbarComponent } from '../../layout/studentnavbar/studentnavbar.component';

@Component({
  selector: 'app-courseann',
  imports: [CommonModule,StudentnavbarComponent],
  templateUrl: './courseann.component.html',
  styleUrl: './courseann.component.css'
})
export class CourseannComponent {
  announcements = [
    {
      sender: 'Dr. Öğr. Üyesi SALIM JIBRIN DANBATTA',
      message: `Dear Students, I would like to remind you of the guidelines on the attached file to ensure a productive and respectful environment in the computer lab. Please take into consideration. Your cooperation is essential for a sustainable learning environment.`,
      createdAt: '2025-03-21',
      updatedAt: '2025-03-21 15:08:52'
      
    }


  
   
  ];
  

}
