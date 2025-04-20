import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { InstructornavbarComponent } from '../../layout/instructornavbar/instructornavbar.component';

@Component({
  selector: 'app-exam-details',
  standalone: true,
  imports: [CommonModule, FormsModule, InstructornavbarComponent, RouterModule],
  templateUrl: './exam-details.component.html',
  styleUrls: ['./exam-details.component.css']
})
export class ExamDetailsComponent {
  // Main data structure with 4 exam entries (same professor)
  examData = {
    header: {
      icon: 'Icons/profile-add.png',
      title: 'Exam Details'
    },
    exams: [
      {
        id: 1,
        avatar: 'Icons/i.png',
        name: 'Dr. Öğr. Üyesi SALIM JIBRIN DANBATTA',
        email: 'salimjibrin.danbattauskudar.edu.tr',
        type: 'Makeup Exam',
        time: '1 Day ago',
        actions: {
          search: 'Icons/search-normal.png',
          edit: 'Icons/edit-2.png',
          delete: 'Icons/trash.png'
        }
      },
      {
        id: 2,
        avatar: 'Icons/i.png',
        name: 'Dr. Öğr. Üyesi SALIM JIBRIN DANBATTA',
        email: 'salimjibrin.danbattauskudar.edu.tr',
        type: 'Final Exam',
        time: '2 Days ago',
        actions: {
          search: 'Icons/search-normal.png',
          edit: 'Icons/edit-2.png',
          delete: 'Icons/trash.png'
        }
      },
      {
        id: 3,
        avatar: 'Icons/i.png',
        name: 'Dr. Öğr. Üyesi SALIM JIBRIN DANBATTA',
        email: 'salimjibrin.danbattauskudar.edu.tr',
        type: 'Midterm Exam',
        time: '3 Days ago',
        actions: {
          search: 'Icons/search-normal.png',
          edit: 'Icons/edit-2.png',
          delete: 'Icons/trash.png'
        }
      },
      {
        id: 4,
        avatar: 'Icons/i.png',
        name: 'Dr. Öğr. Üyesi SALIM JIBRIN DANBATTA',
        email: 'salimjibrin.danbattauskudar.edu.tr',
        type: 'Quiz',
        time: '4 Days ago',
        actions: {
          search: 'Icons/search-normal.png',
          edit: 'Icons/edit-2.png',
          delete: 'Icons/trash.png'
        }
      }
    ],
    addButton: {
      text: 'Add New',
      style: {
        width: '170px',
        height: '40px',
        normalBg: '#243c63',
        hoverGradient: 'linear-gradient(53deg, #243c63 0%, #4b72b0 100%)',
        transition: 'all 0.3s ease'
      }
    }
  };

  constructor(private router: Router) {}

  goToUpload() {
    this.router.navigate(['/upload-note']);
  }


  onButtonHover(event: any) {
    event.target.style.background = this.examData.addButton.style.hoverGradient;
  }

  onButtonLeave(event: any) {
    event.target.style.background = this.examData.addButton.style.normalBg;
  }


  onSearch(exam: any) {
    console.log('Search:', exam);
  }

  onEdit(exam: any) {
    console.log('Edit:', exam);
  }

  onDelete(exam: any) {
    console.log('Delete:', exam);
  }
}