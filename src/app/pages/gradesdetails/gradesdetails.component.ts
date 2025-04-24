import { Component } from '@angular/core';
import { StudentnavbarComponent } from '../../layout/studentnavbar/studentnavbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gradesdetails',
  imports: [StudentnavbarComponent,CommonModule],
  templateUrl: './gradesdetails.component.html',
  styleUrl: './gradesdetails.component.css'
})
export class GradesdetailsComponent {
  courses = [
    { grp: 1, courseCode: 'SE/302', courseName: 'Software Project Management', final: 80,  letterGrade: 'BB', status: 'Passed' },
    { grp: 3, courseCode: 'SE/202', courseName: 'Software Design Architecture', final: 30, resit: '--', grade: 30, letterGrade: 'FF', status: 'Failed' },
    { grp: 1, courseCode: 'SE/302', courseName: 'Software Project Management', final: 80, letterGrade: 'BB', status: 'Passed' },
    { grp: 1, courseCode: 'SE/302', courseName: 'Software Project Management', final: 80, letterGrade: 'BB', status: 'Passed' }
  ];
}
  

