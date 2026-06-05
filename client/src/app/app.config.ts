import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {  APP_INITIALIZER } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

import { jwtInterceptor } from './core/guards/interceptors/jwt.interceptor-interceptor';
import { errorInterceptor } from './core/guards/interceptors/error.intercepto-interceptor';
import { AccountService } from './services/account-service';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
   providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([jwtInterceptor, errorInterceptor])),
    provideAnimations(),
    provideToastr({ positionClass: 'toast-bottom-right' }),
    {
      provide: APP_INITIALIZER,
      useFactory: (accountService: AccountService) => () => accountService.loadCurrentUser(),
      deps: [AccountService],
      multi: true,
    },
    ]
  
};
