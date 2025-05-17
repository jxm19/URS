import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  // ✅ Fixed typo here
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  userType: string = ''; // from URL param (student/instructor/secretary)

  constructor(
    private http: HttpClient, 
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userType = this.route.snapshot.paramMap.get('userType') || 'student';
  }

  onSubmit(form: any) {
    if (form.invalid || !this.email || !this.password) {
      this.errorMessage = 'All fields are required';
      return;
    }

    const payload = {
      email: this.email,
      password: this.password
    };

    let apiUrl = '';
    let redirectUrl = '';

    switch (this.userType) {
      case 'student':
        apiUrl = 'http://127.0.0.1:8000/api/site-student/login';
        redirectUrl = '/studenthome';
        break;
      case 'instructor':
        apiUrl = 'http://127.0.0.1:8000/api/dashboard-instructor/login';
        redirectUrl = '/instructorhome';
        break;
      case 'secretary':
        apiUrl = 'http://127.0.0.1:8000/api/dashboard-secretary/login';
        redirectUrl = '/fchome';
        break;
      default:
        this.errorMessage = 'Unknown user type';
        return;
    }

    this.http.post<any>(apiUrl, payload).subscribe({
      next: (response) => {
        const user = response.user;

        // 🚫 Role mismatch (user type check fails)
        if (
          (this.userType === 'student' && user.is_student !== 1) ||
          (this.userType === 'instructor' && user.is_instructor !== 1) ||
          (this.userType === 'secretary' && user.is_secretary !== 1)
        ) {
          this.errorMessage = 'The account type is not valid for this section';
          return;
        }

        // ✅ Store token
        localStorage.setItem('token', response.token);

        // ✅ If secretary, also store name
        if (this.userType === 'secretary') {
          localStorage.setItem('secretaryName', user.name);
        }

        if (this.userType === 'student') {
          localStorage.setItem('studentName', user.name); // ✅ أضف هذا السطر
        }
        

        // ✅ Navigate
        this.router.navigate([redirectUrl]);
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.errorMessage = error.error?.message || 'Login failed. Please try again.';
      }
    });
  }
}  