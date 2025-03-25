import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

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

  onSubmit(form: any) {
    if (form.invalid) {
      this.errorMessage = 'All fields are required'; 
      return;
    }

    
    const emailDomain = this.email.split('@')[1];
    if (emailDomain !== 'gmail.com') {
      this.errorMessage = 'Enter a valid email address or password';
      return;
    }

  
    this.email = '';
    this.password = '';
    this.errorMessage = '';
    form.resetForm();
  }
}