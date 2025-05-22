import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { InstructornavbarComponent } from '../../layout/instructornavbar/instructornavbar.component';

@Component({
  selector: 'app-resit-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterOutlet, InstructornavbarComponent],  
  templateUrl: './resit-list.component.html',
  styleUrls: ['./resit-list.component.css'],
})
export class ResitListComponent implements OnInit {
  searchTextMap: { [key: number]: string } = {};
  courseStudentsMap: any[] = [];
  instructorName: string = ''; 

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchInstructorName(); 
    this.fetchCoursesAndStudents();
  }

  fetchInstructorName() {
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
        },
        error: (err) => {
          console.error('Error fetching instructor name:', err);
        }
      });
  }

  fetchCoursesAndStudents() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('Token is missing.');
      return;
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    this.http.get<any>('http://127.0.0.1:8000/api/dashboard-instructor/courses', { headers })
      .subscribe({
        next: (response) => {
          const instructorCourses = response?.data?.courses || [];
  
          instructorCourses.forEach((course: any) => {
            this.http.get<any>(`http://127.0.0.1:8000/api/dashboard-instructor/confirmed-students/${course.id}`, { headers })
              .subscribe({
                next: (res) => {
                  this.courseStudentsMap.push({
                    courseId: course.id,
                    courseCode: res.course_code,
                    courseName: res.course_name,
                    students: res.students
                  });
                },
                error: err => {
                  console.warn(`No resit students for course ${course.id}`, err);
                  this.courseStudentsMap.push({
                    courseId: course.id,
                    courseCode: course.course_code,
                    courseName: course.course_name,
                    students: []
                  });
                }
              });
          });
        },
        error: err => {
          console.error('Error fetching instructor courses:', err);
        }
      });
  }
  onSearchInput(courseIndex: number): void {
    // Optional: can be used for debugging or to trigger change detection explicitly
  }

  filterStudents(students: any[], courseIndex: number): any[] {
    const searchText = this.searchTextMap[courseIndex] || '';
    if (!searchText.trim()) return students;

    const term = searchText.toLowerCase();
    return students.filter(
      (s) =>
        s.student_name.toLowerCase().includes(term) ||
        s.student_university_id.toString().includes(searchText)
    );
  }

  exportConfirmedStudents(courseId: number) {
    console.log('Exporting course ID:', courseId);  // log courseId early
  
    if (!courseId) {
      console.warn('Invalid course ID');
      return;
    }
  
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('Token is missing.');
      return;
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    const exportUrl = `http://127.0.0.1:8000/api/dashboard-instructor/confirmed-students/export/${courseId}`;
  
    this.http.get(exportUrl, {
      headers: headers,
      responseType: 'blob' // Important to handle file downloads
    }).subscribe({
      next: (blob) => {
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        a.download = `Confirmed_Students_${courseId}.xlsx`;
        a.click();
        URL.revokeObjectURL(objectUrl);
      },
      error: (err) => {
        console.error('Export failed:', err);
      }
    });
  }
  
}
