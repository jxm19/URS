import { Component, OnInit, ViewChild } from '@angular/core';
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
  searchQuery: string = '';
  filteredGrades: { [courseId: number]: any[] } = {};
  coursePages: { [courseId: number]: { currentPage: number, totalPages: number, paginatedGrades: any[] } } = {};
  itemsPerPage: number = 10;

  @ViewChild('checkAll') checkAll: any;  // Reference to "checkAll" checkbox

  // Store checked state for courses (optional)
  checkedCourses: { [courseId: number]: boolean } = {};

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
  console.log('Grades:', grades); // 👈 paste here

          
          // Initialize checked property for each grade
          grades.forEach((grade: any) => grade.checked = false);
this.filteredGrades[courseId] = grades;

          const totalPages = Math.ceil(grades.length / this.itemsPerPage);
        this.coursePages[courseId] = {
  currentPage: 1,
  totalPages: Math.ceil(grades.length / this.itemsPerPage),
  paginatedGrades: this.filteredGrades[courseId].slice(0, this.itemsPerPage)
};

          // Save grades into the course object
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
      'Authorization': `Bearer ${token}`
    });
    
    if (confirm('Are you sure you want to delete this grade?')) {
      this.http.delete<any>(`http://127.0.0.1:8000/api/dashboard-instructor/grades/${gradeId}`, { headers })
        .subscribe({
          next: () => {
            // Remove from local grades array
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
pageInfo.paginatedGrades = this.filteredGrades[courseId].slice(start, end);
  }

  toggleAllCheckboxes(event: any, courseId: number): void {
    const isChecked = event.target.checked;
    const course = this.courses.find(c => c.id === courseId);
    if (!course || !course.grades) return;

    course.grades.forEach((grade: any) => {
      grade.checked = isChecked;
    });

    // Optionally track if all checked for the course
    this.checkedCourses[courseId] = isChecked;
  }

  isAllChecked(courseId: number): boolean {
    const course = this.courses.find(c => c.id === courseId);
    if (!course || !course.grades) return false;

    return course.grades.every((grade: any) => grade.checked);
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
  

  onSearchChange(courseId: number): void {
    const course = this.courses.find(c => c.id === courseId);
    if (!course || !course.grades) return;
  
    const query = this.searchQuery.trim().toLowerCase();
  
    if (!query) {
      // If search is empty, show all grades
      this.filteredGrades[courseId] = course.grades;
    } else {
      this.filteredGrades[courseId] = course.grades.filter((grade: any) => {
        const studentName = (grade.student.name ?? '').toLowerCase();
        const studentId = (grade.student.student_id ?? '').toString().toLowerCase();
        return studentName.includes(query) || studentId.includes(query);
      });
    }
  
    // Reset to first page after search
    this.coursePages[courseId].currentPage = 1;
    this.paginateCourse(courseId);
  }
  


  cancelSelection(courseId: number): void {
    const course = this.courses.find(c => c.id === courseId);
    if (!course || !course.grades) return;
  
    course.grades.forEach((grade: any) => {
      grade.checked = false;
    });
    this.paginateCourse(courseId);
  }
  
  
  deleteSelectedGrades(courseId: number): void {
    const course = this.courses.find(c => c.id === courseId);
    if (!course || !course.grades) return;
  
    const selectedGrades = course.grades.filter((grade: any) => grade.checked);
  
    if (selectedGrades.length === 0) {
      alert('No grades selected to delete.');
      return;
    }
  
    if (!confirm(`Are you sure you want to delete ${selectedGrades.length} selected grade(s)?`)) {
      return;
    }
  
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  
    selectedGrades.forEach((grade: any) => {
      this.http.delete<any>(`http://127.0.0.1:8000/api/dashboard-instructor/grades/${grade.id}`, { headers })
        .subscribe({
          next: () => {
            const index = course.grades.findIndex((g: any) => g.id === grade.id);
            if (index !== -1) {
              course.grades.splice(index, 1);
              this.filteredGrades[courseId] = course.grades;
              this.paginateCourse(courseId);
            }
          },
          error: (err) => {
            console.error(`Failed to delete grade ID ${grade.id}`, err);
          }
        });
    });
  
    alert(`${selectedGrades.length} grade(s) deleted successfully.`);
  }
}