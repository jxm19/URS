import { Component } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [RouterModule, FormsModule ,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  userType: string = ''; // user type from URL

  constructor(
    private http: HttpClient, 
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userType = this.route.snapshot.paramMap.get('userType') || 'student';
  }

  onSubmit(form: any) {
    if (form.invalid) {
      this.errorMessage = 'All fields are required';
      return;
    }

    const payload = {
      email: this.email,
      password: this.password
    };

    let apiUrl = '';
    let redirectUrl = '';

    if (this.userType === 'student') {
      apiUrl = 'http://127.0.0.1:8001/api/site-student/login';
      redirectUrl = '/studenthome';
    } else if (this.userType === 'instructor') {
      apiUrl = 'http://127.0.0.1:8001/api/dashboard-instructor/login';
      redirectUrl = '/instructorhome';
    } else if (this.userType === 'secretary') {
      apiUrl = 'http://127.0.0.1:8001/api/dashboard-secretary/login';
      redirectUrl = '/fchome';
    }

    this.http.post<any>(apiUrl, payload).subscribe({
      next: (response) => {
        // تحقق من نوع المستخدم بناءً على القيم المرسلة من الـ API
        if (
          (this.userType === 'student' && response.user.is_student !== 1) ||
          (this.userType === 'instructor' && response.user.is_instructor !== 1) ||
          (this.userType === 'secretary' && response.user.is_secretary !== 1)
        ) {
          this.errorMessage = 'The account type is not valid for this section';
          return;
        }
    
        // ✅ Save token and secretaryName (only if secretary)
        localStorage.setItem('token', response.token);
        if (this.userType === 'secretary') {
          localStorage.setItem('secretaryName', response.user.name);
        }
    
        this.router.navigate([redirectUrl]);
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = error.error.message || 'Login failed';
      }
    });
    

  }
}