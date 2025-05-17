import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InstructornavbarComponent } from '../../layout/instructornavbar/instructornavbar.component';
import { RouterModule } from '@angular/router';  


@Component({
  selector: 'app-announcements',
  standalone: true,
  imports: [CommonModule, FormsModule, InstructornavbarComponent, RouterModule],
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {
  instructorName: string = '';
  courses: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('Token is missing.');
      this.instructorName = 'Unknown Instructor';
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any>('http://127.0.0.1:8000/api/dashboard-instructor/courses', { headers })
      .subscribe({
        next: (response) => {
          const instructor = response?.data;
          this.instructorName = instructor?.name || 'Unknown Instructor';
          this.courses = instructor?.courses || [];
        },
        error: (err) => {
          console.error('Error loading instructor courses:', err);
          this.instructorName = 'Unknown Instructor';
          this.courses = [];
        }
      });
  }
}
