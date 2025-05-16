import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-studentnavbar',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './studentnavbar.component.html',
  styleUrl: './studentnavbar.component.css'
})
export class StudentnavbarComponent {
  isCollapsed = false;
  @Input() StudentName: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  logout() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/sections']);
      return;
    }
  
    const headers = {
      'Authorization': `Bearer ${token}`
    };
  
    this.http.post('http://127.0.0.1:8000/api/site-student/logout', {}, { headers }).subscribe({
      next: () => {
        localStorage.removeItem('token');
        this.router.navigate(['/sections']);
      },
      error: err => {
        console.error('Logout failed:', err);
      }
    });
  }
  

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}