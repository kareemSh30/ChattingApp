import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../../services/account-service';
import { inject } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

export const authGuardGuard: CanActivateFn = () => {
  const accountService = inject(AccountService);
 const router= inject(Router);
  const toast= inject(ToastrService);
 
  if(accountService.currentUser())
  {
    return true;
  }
   toast.error("You are not authorized to access this page");
    return router.createUrlTree(['/login']);
 
};
