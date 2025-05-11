import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

interface LogoutResponse {
  message: string;  // Adjust this structure based on your API response
}

@Component({
  selector: 'app-instructornavbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './instructornavbar.component.html',
  styleUrls: ['./instructornavbar.component.css']
})
export class InstructornavbarComponent {
  isCollapsed = false;

  @Input() instructorName: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
  

  logout() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No auth token found');
      return;
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    this.http.post('http://127.0.0.1:8000/api/dashboard-instructor/logout', {}, { headers })
      .subscribe({
        next: () => {
          localStorage.removeItem('token');
          this.router.navigate(['/']);
        },
        error: err => {
          console.error('Logout failed:', err);
        }
      });
  }
  
  
  
}
