import { Component } from '@angular/core';
import { StudentnavbarComponent } from '../../layout/studentnavbar/studentnavbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-studenthome',
  imports: [StudentnavbarComponent,CommonModule],
  templateUrl: './studenthome.component.html',
  styleUrl: './studenthome.component.css',
  standalone:true
})
export class StudenthomeComponent {
  
  course0 = [
    {
      code: 'SE302/1',
      title: 'Software Project Management',
      instructor: 'Dr. Öğr. Üyesi KRİSTİN SURPUHİ BENLİ',
      grade: 'FD',
      status: 'Mandatory',
    },

    
  ];

  course1 = [
    {
      code: 'SE202/1',
      title: 'Software Design and Architecture',
      instructor: 'Dr. Öğr. Üyesi KRİSTİN SURPUHİ BENLİ',
      grade: 'BB',
      status: 'Declined',
    },

    
  ];

  course2 = [
    {
      code: 'SE204/1',
      title: 'Software Requirements Analysis',
      instructor: 'Dr. Öğr. Üyesi KRİSTİN SURPUHİ BENLİ',
      grade: 'BA',
      status: 'Declined',
    },

    
  ];

  course3 = [
    {
      code: 'MATH101/1',
      title: 'Calculus1',
      instructor: 'Dr. Öğr. Üyesi BURHAN PEKTAS',
      grade: 'FF',
      status: 'Mandatory',
    },

  ]
    course4 = [
      {
        code: 'MATH102/1',
        title: 'Calculus2',
        instructor: 'Dr. Öğr. Üyesi BURHAN PEKTAS',
        grade: 'DZ',
        status: 'Mandatory',
      },

    
  ];

  course5 = [
    {
      code: 'SE102/1',
      title: 'Introduction to Software Engineering',
      instructor: 'Dr. Öğr. Üyesi SALIM JIBRIN DANBATTA',
      grade: 'AA',
      status: 'Declined',
    },

  
];


  getGradeColor(grade: string): string {
    switch (grade) {
      case 'FD':
      case 'FF':
      case 'DZ':
        return 'text-danger';
      case 'DC':
      case 'DD':
        return 'text-warning';
      case 'AA':
      case 'BA':
      case 'BB':
      case 'CB':
      case 'CC':
        return 'text-success';
      default:
        return 'text-muted';
    }
  }
  
  getStatusColor(status: string): string {
    switch (status) {
      case 'Mandatory':
        return 'text-danger';
      case 'Optional':
        return 'text-warning';
      case 'Declined':
        return 'text-secondary';
      default:
        return '';
    }
  }
  
  

}
