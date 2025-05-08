import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructornavbarComponent } from '../../layout/instructornavbar/instructornavbar.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-instructorhome',
  standalone: true,
  imports: [CommonModule, InstructornavbarComponent],
  templateUrl: './instructorhome.component.html',
  styleUrls: ['./instructorhome.component.css']
})
export class InstructorhomeComponent implements OnInit {
  courses: any[] = [];
  instructorName: string = '';

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
      .get<any>('http://127.0.0.1:8008/api/dashboard-instructor/courses', { headers })
      .subscribe({
        next: (response) => {
          const instructor = response?.data;
          this.instructorName = instructor?.name || 'Unknown Instructor';
          this.courses = instructor?.courses || [];
        },
        error: (err) => {
          console.error('Error loading instructor courses:', err);
        }
      });
  }
}
