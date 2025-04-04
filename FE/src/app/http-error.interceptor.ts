import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred!';

        if (error.error && error.error.message) {
          errorMessage = error.error.message; // 👈 Use backend error message if exists
        }

        if (error.status === 401) {
          // Unauthorized - maybe token expired
          this.snackBar.open('Session expired, please login again.', 'Close', { duration: 3000 });
          this.router.navigate(['/login']);
        } else {
          this.snackBar.open(errorMessage, 'Close', { duration: 3000 });
        }

        return throwError(() => error);
      })
    );
  }
}
