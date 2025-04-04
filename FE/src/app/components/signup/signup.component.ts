import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm!: FormGroup;
  errorMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private snackBar: MatSnackBar) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.http.post<any>('http://localhost:5050/api/auth/signup', this.signupForm.value)
        .subscribe({
          next: (res) => {
            localStorage.setItem('token', res.data.token); // ✅ Save token
            this.snackBar.open('Signup Successful! 🎉 Please Login.', 'Close', { duration: 3000 });
            this.router.navigate(['/']); // ✅ Redirect to Task List
          },
          error: (err) => {
            this.errorMessage = err.error.message || 'Signup failed!';
            this.snackBar.open('Signup Failed. ❌', 'Close', { duration: 3000 });
          }
        });
    }
  }
}
