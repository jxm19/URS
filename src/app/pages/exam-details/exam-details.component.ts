import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { InstructornavbarComponent } from '../../layout/instructornavbar/instructornavbar.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-exam-details',
  standalone: true,
  imports: [CommonModule, FormsModule, InstructornavbarComponent, RouterModule],
  templateUrl: './exam-details.component.html',
  styleUrls: ['./exam-details.component.css']
})
export class ExamDetailsComponent implements OnInit {
  instructorName: string = '';

  exams: any[] = [];
  selectedExam: any; // Add this property to hold selected exam if not already there


  showDeletePopup = false;
  showEditPopup = false;
  showDeleteSuccess = false;
  showEditSuccess = false;

  courseId!: number;

  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.courseId = Number(this.activatedRoute.snapshot.paramMap.get('courseId'));

    const token = localStorage.getItem('token');
    if (!token) return;

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    this.http
      .get<any>('http://127.0.0.1:8000/api/dashboard-instructor/exam-details', { headers })
      .subscribe({
        next: (response) => {
          const allExams = response?.data || [];

          // Filter to only exams of this course
          this.exams = allExams.filter((exam: any) => exam.course_id === this.courseId);

          this.exams.reverse();

          if (this.exams.length > 0 && this.exams[0].course?.instructor?.name) {
            this.instructorName = this.exams[0].course.instructor.name;
          } else {
            this.instructorName = 'Unknown Instructor';
          }
        },
        error: (err) => console.error('Error fetching exams:', err)
      });
  }

  goToUpload() {
    this.route.navigate(['/upload-note', this.courseId]);
  }
  

  openEditPopup(exam: any) {
    this.selectedExam = exam; // Set the selected exam to the one clicked
    this.showEditPopup = true;
    document.body.classList.add('modal-open');
  }
  

  openDeletePopup(exam: any) {
    this.selectedExam = exam; // ADD THIS LINE
    this.showDeletePopup = true;
    document.body.classList.add('modal-open');
  }
  

  closePopup() {
    this.showEditPopup = false;
    this.showDeletePopup = false;
    document.body.classList.remove('modal-open');
  }

  confirmEdit() {
    if (!this.selectedExam) return;
  
    const token = localStorage.getItem('token');
    if (!token) return;
  
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  
    const updatedExam = {
      announcement_title: this.selectedExam.announcement_title,
      announcement_text: this.selectedExam.announcement_text
    };
  
    this.http
      .put<any>(`http://127.0.0.1:8000/api/dashboard-instructor/exam-details/${this.selectedExam.id}`, updatedExam, { headers })
      .subscribe({
        next: (response) => {
          console.log('Exam updated successfully:', response);
          this.showEditSuccess = true;
          this.closePopup();
          this.ngOnInit();
        },
        error: (err) => {
          console.error('Error updating exam:', err);
        }
      });
  }
  
  
  

  confirmDelete() {
    if (!this.selectedExam) return;
  
    const token = localStorage.getItem('token');
    if (!token) return;
  
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  
    this.http
      .delete<any>(`http://127.0.0.1:8000/api/dashboard-instructor/exam-details/${this.selectedExam.id}`, { headers })
      .subscribe({
        next: (response) => {
          console.log('Exam deleted successfully:', response);
          this.showDeletePopup = false;
          this.showDeleteSuccess = true;
          this.ngOnInit(); // Refresh list
        },
        error: (err) => {
          console.error('Error deleting exam:', err);
        }
      });
  }
  

  onButtonHover(event: any) {
    event.target.style.background = 'linear-gradient(53deg, #243c63 0%, #4b72b0 100%)';
  }

  onButtonLeave(event: any) {
    event.target.style.background = '#243c63';
  }

  closeSuccessPopup() {
    this.showEditSuccess = false;
    this.showDeleteSuccess = false;
    document.body.classList.remove('modal-open');
  }
}
