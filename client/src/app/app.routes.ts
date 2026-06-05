import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'register', loadComponent: () => import('./pages/register/register').then(m => m.Register) },
  {path: 'main-chat', loadComponent: () => import('./pages/main-chat/main-chat').then(m => m.MainChat)}
];
