import { Component } from '@angular/core';
import { StudentnavbarComponent } from '../../layout/studentnavbar/studentnavbar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-examdetails',
  imports: [StudentnavbarComponent,CommonModule,RouterModule],
  templateUrl: './examdetails.component.html',
  styleUrl: './examdetails.component.css'
})
export class ExamdetailsComponent {
  courses = [
    { courseName: 'Software Project Management'},
    { courseName: 'Software Design and Architecture'},
    { courseName: 'Software Requirements Analysis'},
   
  ];
}
