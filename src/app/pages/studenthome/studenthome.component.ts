import { Component, OnInit } from '@angular/core';
import { StudentnavbarComponent } from '../../layout/studentnavbar/studentnavbar.component';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-studenthome',
  standalone: true,
  imports: [StudentnavbarComponent, CommonModule],
  templateUrl: './studenthome.component.html',
  styleUrls: ['./studenthome.component.css']
})
export class StudenthomeComponent implements OnInit {
  courses: any[] = [];
  groupedCourses: any[][] = [];
  showPopup = false;
  showSuccessPopup = false;
  selectedCourse: any;
  StudentName: string = '';

  constructor(private http: HttpClient,private router: Router) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  private loadCourses() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
  
      this.http.get<any>('http://127.0.0.1:8000/api/site-student/courses', { headers })
        .subscribe({
          next: (response) => {
            this.courses = response.data?.courses || [];
            const studentName = this.courses[0]?.student_name || 'Unknown Student';
            localStorage.setItem('student_name', studentName);  // تخزين الاسم في localStorage
            this.StudentName = studentName; // تحميل الاسم هنا أيضاً
            this.processCourses();
            this.groupCourses();
          },
          error: (err) => {
            console.error('Error loading courses:', err);
            this.courses = this.getDefaultCourses();
            this.groupCourses();
          }
        });
    }
  }

  private processCourses() {
    this.courses.forEach(course => {
      if (course.is_confirmed) {
        course.status = 'Confirmed'; // حالة مؤكدة بعد الضغط على الزر
      } else if (['AA', 'BA', 'BB', 'CB', 'CC', 'DZ'].includes(course.letter_grade)) {
        course.status = 'Declined'; // غير قابل للتأكيد
      } else {
        course.status = 'Unconfirmed'; // قابل للتأكيد
      }
    });
  }
  

  private groupCourses() {
    this.groupedCourses = [];
    for (let i = 0; i < this.courses.length; i += 2) {
      this.groupedCourses.push(this.courses.slice(i, i + 2));
    }
  }

  private getDefaultCourses() {
    return [];
  }

  openPopup(course: any) {
    this.selectedCourse = course;
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  confirmAttendance() {
    if (!this.selectedCourse) return;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const body = {
      course_id: this.selectedCourse.id || this.selectedCourse.course_id
    };

    this.http.post('http://127.0.0.1:8000/api/site-student/resit_confirm', body, { headers })
      .subscribe({
        next: (response) => {
          this.selectedCourse.status = 'Confirmed';
          this.selectedCourse.is_confirmed = true;
          this.showPopup = false;
          this.showSuccessPopup = true;
          setTimeout(() => this.closeSuccessPopup(), 3000);
        },
        error: (err) => {
          console.error('Error confirming attendance:', err);
          // يمكنك إضافة رسالة خطأ للمستخدم هنا إذا لزم الأمر
        }
      });
  }

  closeSuccessPopup() {
    this.showSuccessPopup = false;
  }

  viewExamSchedule(course: any) {
    this.router.navigate(['/examschedule']);
  }
  

  getGradeColor(letter_grade: string): string {
    switch (letter_grade) {
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
        return '';
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