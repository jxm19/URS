import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { InstructornavbarComponent } from '../../layout/instructornavbar/instructornavbar.component';

@Component({
  selector: 'app-instructor-exam-schedule',
  standalone: true,
  imports: [CommonModule, InstructornavbarComponent],
  templateUrl: './instructor-exam-schedule.component.html',
  styleUrls: ['./instructor-exam-schedule.component.css']
})
export class InstructorExamScheduleComponent implements OnInit {
  instructorName: string = '';
  courses: {
    courseCode: string;
    courseName: string;
    instructor: string;
    date: string;
    time: string;
    classroom: string;
  }[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchExamSchedules();
  }

  fetchExamSchedules(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found. User is not authenticated.');
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`
    };

    this.http.get<any>('http://localhost:8001/api/dashboard-instructor/instructor/exam-schedules', { headers })
      .subscribe(
        (response) => {
          console.log('API response:', response);

          if (response.success && Array.isArray(response.data)) {
            this.courses = response.data.map((schedule: any) => ({
              courseCode: schedule.course?.course_code ?? 'N/A',
              courseName: schedule.course?.course_name ?? 'N/A',
              instructor: schedule.course?.instructor?.name ?? 'N/A',
              date: schedule.exam_date,
              time: schedule.exam_time,
              classroom: schedule.classroom
            }));

            // Set instructor name from first course if available
            if (this.courses.length > 0) {
              this.instructorName = this.courses[0].instructor;
            }

            console.log(this.courses);
          } else {
            console.warn('Unexpected response format', response);
          }
        },
        (error) => {
          console.error('Error fetching exam schedules:', error);
        }
      );
  }
}
  

