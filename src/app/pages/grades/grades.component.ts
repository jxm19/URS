import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructornavbarComponent } from '../../layout/instructornavbar/instructornavbar.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterModule } from '@angular/router'; // ✅ Add this


@Component({
  selector: 'app-grades',
  standalone: true,
  imports: [CommonModule, InstructornavbarComponent, RouterModule],
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent implements OnInit {
  courses: any[] = [];
  instructorName: string = '';
  coursePages: { [courseId: number]: { currentPage: number, totalPages: number, paginatedGrades: any[] } } = {};
  itemsPerPage: number = 10;

  @ViewChild('checkAll') checkAll: any;  // Reference to "checkAll" checkbox

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('Token is missing.');
      return;
    }
  
    const headers = new HttpHeaders({
'Authorization': `Bearer ${token}`    });
    
  
    this.http
      .get<any>('http://127.0.0.1:8000/api/dashboard-instructor/courses', { headers })
      .subscribe({
        next: (response) => {
          const instructor = response?.data;
          this.instructorName = instructor?.name || 'Unknown Instructor';
          this.courses = instructor?.courses || [];
  
          for (let course of this.courses) {
            this.getGradesForCourse(course.id, headers);
          }
        },
        error: (err) => {
          console.error('Error loading instructor courses:', err);
        }
      });
  }

  
  getGradesForCourse(courseId: number, headers: HttpHeaders): void {
    this.http.get<any>(`http://127.0.0.1:8000/api/dashboard-instructor/courses/${courseId}/grades`, { headers })
    .subscribe({
        next: (res) => {
          const grades = res?.data?.grades || [];
          const totalPages = Math.ceil(grades.length / this.itemsPerPage);
          this.coursePages[courseId] = {
            currentPage: 1,
            totalPages: totalPages,
            paginatedGrades: grades.slice(0, this.itemsPerPage)
          };
  
          // Save grades into the course object for easier access if needed
          const courseIndex = this.courses.findIndex(c => c.id === courseId);
          if (courseIndex !== -1) {
            this.courses[courseIndex].grades = grades;
          }
        },
        error: (err) => {
          console.error(`Error fetching grades for course ${courseId}:`, err);
        }
      });
  }
  


  deleteGrade(gradeId: number, courseId: number): void {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('Token is missing.');
      return;
    }
  
    const headers = new HttpHeaders({
'Authorization': `Bearer ${token}`    });
    
  
    if (confirm('Are you sure you want to delete this grade?')) {
      this.http.delete<any>(`http://127.0.0.1:8000/api/dashboard-instructor/grades/${gradeId}`, { headers })
        .subscribe({
          next: () => {
            // Remove from the local grades array
            const courseIndex = this.courses.findIndex(c => c.id === courseId);
            if (courseIndex !== -1) {
              const gradeIndex = this.courses[courseIndex].grades.findIndex((g: any) => g.id === gradeId);
              if (gradeIndex !== -1) {
                this.courses[courseIndex].grades.splice(gradeIndex, 1);
                this.paginateCourse(courseId);
              }
            }
            alert('Grade deleted successfully!');
          },
          error: (err) => {
            console.error('Error deleting grade:', err);
            alert('Failed to delete grade.');
          }
        });
    }
  }
  

  changePage(courseId: number, direction: string): void {
    const pageInfo = this.coursePages[courseId];
    if (!pageInfo) return;

    if (direction === 'next' && pageInfo.currentPage < pageInfo.totalPages) {
      pageInfo.currentPage++;
    } else if (direction === 'prev' && pageInfo.currentPage > 1) {
      pageInfo.currentPage--;
    }

    this.paginateCourse(courseId);
  }

  goToPage(courseId: number, page: number): void {
    this.coursePages[courseId].currentPage = page;
    this.paginateCourse(courseId);
  }

  paginateCourse(courseId: number): void {
    const course = this.courses.find(c => c.id === courseId);
    const pageInfo = this.coursePages[courseId];
    if (!course || !pageInfo) return;

    const start = (pageInfo.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    pageInfo.paginatedGrades = course.grades.slice(start, end);
  }

  toggleAllCheckboxes(event: any): void {
    const isChecked = event.target.checked;
    const checkboxes = document.querySelectorAll('.form-check-input');
    checkboxes.forEach((checkbox: any) => {
      checkbox.checked = isChecked;
    });
  }

  editGrade(grade: any): void {
    const updatedFinalGrade = prompt('Enter new final grade:', grade.final_grade);
    if (updatedFinalGrade === null) return;
  
    const updatedAbsenteeismInput = prompt('Enter absenteeism (optional):', grade.absenteeism ?? '');
    const updatedResitGradeInput = prompt('Enter resit exam grade (optional):', grade.resit_exam_grade ?? '');
    const updatedLetterGrade = prompt('Enter letter grade:', grade.letter_grade);
    if (updatedLetterGrade === null || updatedLetterGrade.trim() === '') {
      alert('Letter grade is required.');
      return;
    }
  
    const updatedAbsenteeism = updatedAbsenteeismInput?.trim() === '' ? null : +updatedAbsenteeismInput!;
    const updatedResitGrade = updatedResitGradeInput?.trim() === '' ? null : +updatedResitGradeInput!;
  
    this.updateGrade(
      grade.id,
      +updatedFinalGrade,
      updatedAbsenteeism,
      updatedResitGrade,
      updatedLetterGrade.trim(),
      grade.course.id
    );
  }
  
  
  
  updateGrade(
    gradeId: number,
    finalGrade: number,
    absenteeism: number | null,
    resitExamGrade: number | null,
    letterGrade: string,
    courseId: number
  ): void {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('Token is missing.');
      return;
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    const body = {
      final_grade: finalGrade,
      absenteeism: absenteeism,
      resit_exam_grade: resitExamGrade,
      letter_grade: letterGrade
    };
  
    this.http.put<any>(`http://127.0.0.1:8000/api/dashboard-instructor/grades/${gradeId}`, body, { headers })
      .subscribe({
        next: (res) => {
          alert('Grade updated successfully!');
  
          const course = this.courses.find(c => c.id === courseId);
          if (course) {
            const index = course.grades.findIndex((g: any) => g.id === gradeId);
            if (index !== -1) {
              course.grades[index] = {
                ...course.grades[index],
                final_grade: res.data.final_grade,
                resit_exam_grade: res.data.resit_exam_grade,
                letter_grade: res.data.letter_grade,
                absenteeism: res.data.absenteeism,
                status: res.data.status
              };
              this.paginateCourse(courseId);
            }
          }
        },
        error: (err) => {
          console.error('Failed to update grade:', err);
          alert('Failed to update grade. Please check your input.');
        }
      });
  }
  
  
}