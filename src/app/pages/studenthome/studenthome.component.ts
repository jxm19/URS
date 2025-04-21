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
      status: 'Unconfirmed'
    },

    
  ];

  course1 = [
    {
      code: 'SE202/1',
      title: 'Software Design and Architecture',
      instructor: 'Dr. Öğr. Üyesi KRİSTİN SURPUHİ BENLİ',
      grade: 'BB',
      status: 'Declined'
    },

    
  ];

  course2 = [
    {
      code: 'SE204/1',
      title: 'Software Requirements Analysis',
      instructor: 'Dr. Öğr. Üyesi KRİSTİN SURPUHİ BENLİ',
      grade: 'DD',
      status: 'Unconfirmed'
    },

    
  ];

  course3 = [
    {
      code: 'MATH101/1',
      title: 'Calculus1',
      instructor: 'Dr. Öğr. Üyesi BURHAN PEKTAS',
      grade: 'FF',
      status: 'Unconfirmed'
    },

  ]
    course4 = [
      {
        code: 'MATH102/1',
        title: 'Calculus2',
        instructor: 'Dr. Öğr. Üyesi BURHAN PEKTAS',
        grade: 'DZ',
        status: 'Declined'
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
      case 'DZ':
      return 'text-secondary';
      
      default:
        return 'text-muted';
    }
  }
  
  getStatusColor(status: string): string {
    switch (status) {
      case 'Unconfirmed':
        return 'text-danger';
      case 'Confirmed':
        return 'text-success';
      case 'Declined':
        return 'text-secondary';
      default:
        return '';
    }
  }
  
  

}
