import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructornavbarComponent } from '../../layout/instructornavbar/instructornavbar.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-grades',
  standalone: true,
  imports: [CommonModule, InstructornavbarComponent, RouterModule, FormsModule],
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent implements OnInit {
  courses: any[] = [];
  instructorName: string = '';
  coursePages: { [courseId: number]: { currentPage: number, totalPages: number, paginatedGrades: any[] } } = {};
  itemsPerPage: number = 10;
  searchText: { [courseId: number]: string } = {};
  selectAllChecked: { [courseId: number]: boolean } = {};  // For "select all" per course

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('Token is missing.');
      return;
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    this.http
      .get<any>('http://127.0.0.1:8000/api/dashboard-instructor/courses', { headers })
      .subscribe({
        next: (response) => {
          const instructor = response?.data;
          this.instructorName = instructor?.name || 'Unknown Instructor';
          this.courses = instructor?.courses || [];
  
          for (let course of this.courses) {
            this.getGradesForCourse(course.id, headers);
            this.searchText[course.id] = '';
            this.selectAllChecked[course.id] = false;
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
          let grades = res?.data?.grades || [];
          grades = grades.map((g: any) => ({ ...g, checked: false }));

          const totalPages = Math.ceil(grades.length / this.itemsPerPage);
          this.coursePages[courseId] = {
            currentPage: 1,
            totalPages: totalPages,
            paginatedGrades: grades.slice(0, this.itemsPerPage)
          };

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

  filterGrades(courseId: number): void {
    const course = this.courses.find(c => c.id === courseId);
    if (!course || !course.grades) return;

    const search = this.searchText[courseId]?.toLowerCase() || '';

    const filteredGrades = course.grades.filter((grade: any) =>
      grade.student.name.toLowerCase().includes(search) ||
      grade.student.student_id.toLowerCase().includes(search)
    );

    this.coursePages[courseId].currentPage = 1;
    this.coursePages[courseId].totalPages = Math.ceil(filteredGrades.length / this.itemsPerPage);
    this.coursePages[courseId].paginatedGrades = filteredGrades.slice(0, this.itemsPerPage);

    // Reset select all checkbox for filtered results
    this.selectAllChecked[courseId] = false;
  }

  deleteGrade(gradeId: number, courseId: number): void {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('Token is missing.');
      return;
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    if (confirm('Are you sure you want to delete this grade?')) {
      this.http.delete<any>(`http://127.0.0.1:8000/api/dashboard-instructor/grades/${gradeId}`, { headers })
        .subscribe({
          next: () => {
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

    const search = this.searchText[courseId]?.toLowerCase() || '';
    let filteredGrades = course.grades;
    if (search) {
      filteredGrades = course.grades.filter((grade: any) =>
        grade.student.name.toLowerCase().includes(search) ||
        grade.student.student_id.toLowerCase().includes(search)
      );
    }

    const start = (pageInfo.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    pageInfo.paginatedGrades = filteredGrades.slice(start, end);

    // Update total pages according to filtered results
    pageInfo.totalPages = Math.ceil(filteredGrades.length / this.itemsPerPage);
  }

  toggleAllCheckboxes(courseId: number, event: any): void {
    const isChecked = event.target.checked;
    const course = this.courses.find(c => c.id === courseId);
    if (!course || !course.grades) return;

    course.grades.forEach((grade: any) => grade.checked = isChecked);
    this.selectAllChecked[courseId] = isChecked;
    this.paginateCourse(courseId);
  }

  toggleCheckbox(courseId: number, grade: any, event: any): void {
    grade.checked = event.target.checked;
    const course = this.courses.find(c => c.id === courseId);
    if (!course || !course.grades) return;

    // Update select all checkbox state for the course
    const allChecked = course.grades.every((g: any) => g.checked);
    this.selectAllChecked[courseId] = allChecked;
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
