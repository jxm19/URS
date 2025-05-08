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
  searchText = '';
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
      .get<any>('http://127.0.0.1:8008/api/dashboard-instructor/courses', { headers })
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
  
    this.http.get<any>('http://127.0.0.1:8008/api/dashboard-instructor/courses', { headers })
      .subscribe({
        next: (response) => {
          const instructorCourses = response?.data?.courses || [];
  
          instructorCourses.forEach((course: any) => {
            this.http.get<any>(`http://127.0.0.1:8008/api/dashboard-instructor/confirmed-students/${course.id}`, { headers })
              .subscribe({
                next: (res) => {
                  this.courseStudentsMap.push({
                    courseCode: res.course_code,
                    courseName: res.course_name,
                    students: res.students
                  });
                },
                error: err => {
                  console.warn(`No resit students for course ${course.id}`, err);
                  this.courseStudentsMap.push({
                    courseCode: course.course_code,
                    courseName: course.course_name,
                    students: [] // empty list means no confirmed students
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
  

  filterStudents(students: any[]): any[] {
    if (!this.searchText.trim()) return students;

    const term = this.searchText.toLowerCase();
    return students.filter(s =>
      s.student_name.toLowerCase().includes(term) ||
      s.student_university_id.includes(this.searchText)
    );
  }
}
