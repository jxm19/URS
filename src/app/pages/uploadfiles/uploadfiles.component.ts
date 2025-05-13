import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgClass, CommonModule } from '@angular/common'; 
import { FcnavbarComponent } from '../../layout/fcnavbar/fcnavbar.component';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-uploadfiles',
  standalone: true,
  imports: [CommonModule, NgClass, FcnavbarComponent, FormsModule],
  templateUrl: './uploadfiles.component.html',
  styleUrls: ['./uploadfiles.component.css']
})
export class UploadfilesComponent implements OnInit {
  secretaryName: string = '';
  courses: {
    id: string;
    courseCode: string;
    courseName: string;
    instructor: string;
    date: string;
    time: string;
    classroom: string;
  }[] = [];
  isModalVisible = false;
  isEditModalVisible = false;
  courseToDelete: any = null;
  courseToEdit: any = null;

  // Modal data for editing
  updatedDate: string = '';
  updatedTime: string = '';
  updatedClassroom: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.secretaryName = localStorage.getItem('secretaryName') || 'Unknown Secretary';
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

    this.http.get<any>('http://localhost:8001/api/exam-schedules/', { headers })
      .subscribe(
        (response) => {
          if (response.success && Array.isArray(response.data)) {
            this.courses = response.data.map((schedule: any) => ({
              id: schedule.id,
              courseCode: schedule.course?.course_code ?? 'N/A',
              courseName: schedule.course?.course_name ?? 'N/A',
              instructor: schedule.course?.instructor?.name ?? 'N/A',
              date: schedule.exam_date,
              time: schedule.exam_time,
              classroom: schedule.classroom
            }));
          } else {
            console.warn('Unexpected response format', response);
          }
        },
        (error) => {
          console.error('Error fetching exam schedules:', error);
        }
      );
  }

  openModal(course: any): void {
    this.courseToDelete = course;
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
    this.courseToDelete = null;
  }

  confirmDelete(): void {
    const scheduleId = this.courseToDelete.id;
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found. User is not authenticated.');
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`
    };

    this.http.delete<any>(`http://localhost:8001/api/exam-schedules/${scheduleId}`, { headers })
      .subscribe(
        (response) => {
          if (response.success) {
            this.courses = this.courses.filter(course => course.id !== scheduleId);
            this.closeModal();
            alert('Exam schedule deleted successfully.');
          } else {
            console.error('Error deleting exam schedule:', response);
          }
        },
        (error) => {
          console.error('Error deleting exam schedule:', error);
        }
      );
  }

  openEditModal(course: any, index: number): void {
    this.courseToEdit = { ...course };  // Copy the course object to avoid reference issues
    console.log('Editing course:', this.courseToEdit);  // Debugging the course data
    
    // Prepopulate the modal fields with course data
    this.updatedDate = this.courseToEdit.date;
    this.updatedTime = this.courseToEdit.time;
    this.updatedClassroom = this.courseToEdit.classroom;
    
    // Set the index if needed (not really necessary unless used elsewhere in the modal)
    this.courseToEdit.index = index;  // Storing index if you want to track it for any reason
  
    this.isEditModalVisible = true;
  }

  closeEditModal(): void {
    this.isEditModalVisible = false;
    this.courseToEdit = null;
  }

  confirmEdit(): void {
    if (!this.courseToEdit || !this.courseToEdit.course_id) {
      console.error('Course data or course_id is missing.');
      return;
    }
  
    const scheduleId = this.courseToEdit.id;  // Use the schedule ID
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found. User is not authenticated.');
      return;
    }
  
    const headers = {
      Authorization: `Bearer ${token}`
    };
  
    // Prepare the updated schedule object with course_id
    const updatedSchedule = {
      course_id: this.courseToEdit.course_id,  // Ensure we get the correct course_id from courseToEdit
      exam_date: this.updatedDate,
      exam_time: this.updatedTime,
      classroom: this.updatedClassroom
    };
  
    this.http.put<any>(`http://localhost:8001/api/exam-schedules/${scheduleId}`, updatedSchedule, { headers })
      .subscribe(
        (response) => {
          if (response.success) {
            // Update the course in the courses list
            this.courses = this.courses.map((course, index) =>
              index === this.courseToEdit.index ? { ...course, ...updatedSchedule } : course
            );
            this.closeEditModal();
            alert('Exam schedule updated successfully.');
          } else {
            console.error('Error updating exam schedule:', response);
          }
        },
        (error) => {
          console.error('Error updating exam schedule:', error);
        }
      );
  }
  
  
}
