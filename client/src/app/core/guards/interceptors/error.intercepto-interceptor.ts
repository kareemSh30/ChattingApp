
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { AccountService } from '../../../services/account-service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toast = inject(ToastrService);
  const accountService = inject(AccountService);

  return next(req).pipe(
    catchError(error => {
      if (error.status === 401) {
        accountService.logout();
        router.navigate(['/']);
        toast.error('Session expired. Please log in again.');
      } else if (error.status === 403) {
        toast.error('You do not have permission to do that.');
      } else if (error.status === 404) {
        router.navigate(['/not-found']);
      } else if (error.status === 500) {
        toast.error('Internal server error. Please try again later.');
      } else if (error.status === 0) {
        toast.error('Cannot reach the server. Check your connection.');
      }

      return throwError(() => error);
    })
  );
};