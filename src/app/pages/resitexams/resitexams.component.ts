import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { StudentnavbarComponent } from '../../layout/studentnavbar/studentnavbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resitexams',
  imports: [StudentnavbarComponent, CommonModule],
  templateUrl: './resitexams.component.html',
  styleUrls: ['./resitexams.component.css'],
  standalone: true
})
export class ResitexamsComponent implements OnInit {

  showPopup = false;
  showSuccessPopup = false;
  courses: any[] = [];  // مصفوفة لتخزين البيانات المستلمة من الـ API
  currentResitExamId: number | null = null;  // لتخزين الـ resit_exam_id المراد حذفه
  StudentName: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.StudentName = localStorage.getItem('student_name') || 'Unknown Student';
    this.loadCourses();  // استدعاء دالة تحميل الدورات عند تحميل المكون
  }

  // دالة لتحميل الدورات الدراسية بعد التأكد من وجود توكين في localStorage
  loadCourses(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('token');
      if (token) {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });

        // استدعاء الـ API مع التوكن في الهيدر
        this.http.get<any[]>('http://127.0.0.1:8000/api/site-student/resit_confirmed', { headers })
          .subscribe(
            (data) => {
              this.courses = data;  // تخزين البيانات في المصفوفة
            },
            (error) => {
              console.error('Error fetching data', error);  // معالجة الأخطاء في حالة حدوثها
            }
          );
      } else {
        console.log('No token found in localStorage');
      }
    }
  }

  // دالة لفتح النافذة المنبثقة مع تمرير resit_exam_id
  openPopup(resit_exam_id: number): void {
    this.currentResitExamId = resit_exam_id;  // تخزين resit_exam_id
    this.showPopup = true;
    document.body.classList.add('modal-open');
  }

  closePopup(): void {
    this.showPopup = false;
    document.body.classList.remove('modal-open');
  }

  // دالة لتأكيد إلغاء الحضور
  confirmAttendance(): void {
    if (this.currentResitExamId !== null) {
      const token = localStorage.getItem('token');
      if (token) {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
  
        this.http.delete(`http://127.0.0.1:8000/api/site-student/resit_confirm/${this.currentResitExamId}`, { headers })
          .subscribe(
            () => {
              console.log('Attendance cancelled successfully');
  
              // احذف العنصر يدويًا من المصفوفة بدل ما تنتظر الـ GET
              this.courses = this.courses.filter(course => course.resit_exam_id !== this.currentResitExamId);
  
              this.showPopup = false;
              this.showSuccessPopup = true;
              this.currentResitExamId = null;
            },
            (error) => {
              console.error('Error canceling attendance', error);
            }
          );
      }
    }
  }
  

  closeSuccessPopup(): void {
    this.showSuccessPopup = false;
    document.body.classList.remove('modal-open');
  }
}
