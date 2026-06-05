import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AccountService } from '../../services/account-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private accountService = inject(AccountService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  email = signal('');
  password = signal('');

  login() {
     this.accountService.login({ email: this.email(), password: this.password() }).subscribe({
      next: () => {
        this.toastr.success('Login successful');
        this.router.navigate(['/main-chat']);
      },
      error: (err) => {
        this.toastr.error(err.error || 'Login failed');
      }
    });
  }
}
