// src/app/core/guards/auth-redirect.guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AccountService } from '../../services/account-service';

export const authRedirectGuard: CanActivateFn = () => {
  const accountService = inject(AccountService);
  const router = inject(Router);

  if (accountService.currentUser()) {
    return router.createUrlTree(['/main-chat']);
  }

  return true;
};