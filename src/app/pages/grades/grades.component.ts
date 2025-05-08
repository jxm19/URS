// grades.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { InstructornavbarComponent } from '../../layout/instructornavbar/instructornavbar.component';

@Component({
  selector: 'app-grades',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterOutlet, InstructornavbarComponent],
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent implements OnInit {
  instructorName = '';
  courses: any[] = [];
  currentPage = 1;
  rowsPerPage = 6;
  selectedCourseIndex = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchInstructorName();
    this.fetchCoursesAndStudents();
  }

  get totalPages(): number {
    if (!this.courses[this.selectedCourseIndex]) return 1;
    return Math.ceil(this.courses[this.selectedCourseIndex].students?.length / this.rowsPerPage || 1);
  }

  get totalPagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((_, i) => i + 1);
  }

  changePage(direction: string) {
    if (direction === 'next' && this.currentPage < this.totalPages) {
      this.currentPage++;
    } else if (direction === 'prev' && this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  get paginatedStudents() {
    const course = this.courses[this.selectedCourseIndex];
    if (!course || !course.students) return [];
    const startIndex = (this.currentPage - 1) * this.rowsPerPage;
    return course.students.slice(startIndex, startIndex + this.rowsPerPage);
  }

  selectCourse(index: number) {
    this.selectedCourseIndex = index;
    this.currentPage = 1;
  }

  fetchInstructorName() {
    const token = localStorage.getItem('token');
    if (!token) return;

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    this.http.get<any>('http://127.0.0.1:8008/api/dashboard-instructor/info', { headers })
      .subscribe({
        next: (res) => {
          this.instructorName = res?.data?.name || 'Unknown';
        },
        error: (err) => console.error('Error fetching instructor name', err)
      });
  }

  fetchCoursesAndStudents() {
    const token = localStorage.getItem('token');
    if (!token) return;

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    this.http.get<any>('http://127.0.0.1:8008/api/dashboard-instructor/courses', { headers })
      .subscribe({
        next: (response) => {
          const courses = response?.data?.courses || [];
          this.courses = courses.map((course: any) => ({ ...course, students: [] }));

          this.courses.forEach((course, index) => {
            this.http.get<any>(`http://127.0.0.1:8008/api/dashboard-instructor/students-grades/${course.id}`, { headers })
              .subscribe({
                next: (res) => {
                  this.courses[index].students = res?.students || [];
                },
                error: err => console.warn(`Error fetching students for course ${course.id}`, err)
              });
          });
        },
        error: err => console.error('Error fetching courses', err)
      });
  }
}
