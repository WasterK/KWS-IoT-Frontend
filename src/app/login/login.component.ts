import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar 
  ) {}

  username: string = '';
  password: string = '';
  
  onSignIn() {
    // Redirect user to Flask backend for Google login
    window.location.href = 'https://127.0.0.1:5000/login';
  }

  onSubmit() {
    console.log('Login clicked!');
    console.log('Username:', this.username);
    console.log('Password:', this.password);

    this.http.post(
      "http://127.0.0.1:5000/login", 
      {'username': this.username, 'password': this.password}
    ).subscribe(
      (response: HttpResponse<any>) => {
        console.log('Response Status:', response.status);
        console.log('Response Data:', response.body);
        const loginStatus = response.status.toString();
        const token = response.body.token;
        console.log(`loginStatus ${loginStatus}`)
        if (loginStatus == 'success') {
          localStorage.setItem('token', token);
          this.snackBar.open('Login successful!', 'Close', {
            duration: 3000,
            panelClass: ['login-success']
          });
          this.router.navigate(['/dashboard']);
        } else if (loginStatus == 'fail') {
          this.snackBar.open('Login failed. Please check your credentials and try again.', 'Close', {
            duration: 3000, // Duration in milliseconds
            panelClass: ['login-fail']
          });
          // Clear input fields on login failure
          this.username = '';
          this.password = '';
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    )

  }
}
