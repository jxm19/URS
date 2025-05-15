import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fcnavbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fcnavbar.component.html',
  styleUrls: ['./fcnavbar.component.css']
})
export class FcnavbarComponent {
  @Input() secretaryName: string = '';
  isCollapsed = false;

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

    this.http.post('http://127.0.0.1:8000/api/dashboard-secretary/logout', {}, { headers })
      .subscribe({
        next: () => {
          localStorage.removeItem('token');
          localStorage.removeItem('secretaryName');
          this.router.navigate(['/']);
        },
        error: err => {
          console.error('Logout failed:', err);
        }
      });
  }
}
