import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InstructornavbarComponent } from '../../layout/instructornavbar/instructornavbar.component';

@Component({
  selector: 'app-examschedule',
  imports: [CommonModule,InstructornavbarComponent,],
  templateUrl: './examschedule.component.html',
  styleUrl: './examschedule.component.css'
})
export class ExamscheduleComponent {
  courses = [
    { courseCode: 'SE/302', courseName: 'Software Project Management', instructor: 'SALIM JIBRIN DANBATTA', date:'16.07.2024', time: '14:40', classroom:'Nermin Tarhan, Ayhan Songar, Kuleli'},
    { courseCode: 'SE/202', courseName: 'Software Design Architecture', instructor: 'SALIM JIBRIN DANBATTA', date:'16.07.2024', time: '14:40', classroom:'Nermin Tarhan, DZ102, A306'},
    { courseCode: 'SE/302', courseName: 'Software Project Management', instructor: 'SALIM JIBRIN DANBATTA', date:'16.07.2024', time: '14:40', classroom:'Ayhan Songar'},
    { courseCode: 'SE/302', courseName: 'Software Project Management', instructor: 'SALIM JIBRIN DANBATTA', date:'16.07.2024', time: '14:40', classroom:'Nermin Tarhan, Kuleli'}
  ];
}
