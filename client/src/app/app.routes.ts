import { Routes } from '@angular/router';

import { authRedirectGuard } from './core/guards/auth-redirect-guard-guard';
import { authGuardGuard } from './core/guards/auth-guard-guard';

export const routes: Routes = [
  { path: '', loadComponent: () =>
      import('./pages/home/home').then(m => m.Home) },
  {
    path: 'login',
    canActivate: [authRedirectGuard],
    loadComponent: () =>
      import('./pages/login/login').then(m => m.Login),
  },
  {
    path: 'register',
    canActivate: [authRedirectGuard],
    loadComponent: () =>
      import('./pages/register/register').then(m => m.Register),
  },
  {
    path: 'main-chat',
    canActivate: [authGuardGuard],
    loadComponent: () =>
      import('./pages/main-chat/main-chat').then(m => m.MainChat),
  },
  { path: '**', redirectTo: '' },
];