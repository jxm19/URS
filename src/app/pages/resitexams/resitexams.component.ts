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
  courses = [
    { courseCode: 'SE/302', courseName: 'Software Project Management', instructor: 'SALIM JIBRIN DANBATTA'},
    { courseCode: 'SE/202', courseName: 'Software Design Architecture', instructor: 'SALIM JIBRIN DANBATTA'},
    { courseCode: 'SE/302', courseName: 'Software Project Management', instructor: 'SALIM JIBRIN DANBATTA'},
    { courseCode: 'SE/302', courseName: 'Software Project Management', instructor: 'SALIM JIBRIN DANBATTA'}
  ];

}
