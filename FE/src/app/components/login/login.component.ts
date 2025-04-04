import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private snackBar: MatSnackBar,) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.http.post<any>('http://localhost:5050/api/auth/login', this.loginForm.value)
        .subscribe({
          next: (res) => {
            localStorage.setItem('token', res.data.token); // ✅ Save token
            this.snackBar.open('Login Successful! 🚀', 'Close', { duration: 3000 });
            this.router.navigate(['/']); // ✅ Redirect to Task List
          },
          error: (err) => {
            this.snackBar.open('Login Failed. ❌', 'Close', { duration: 3000 });
            this.errorMessage = err.error.message || 'Login failed!';
          }
        });
    }
  }
}
