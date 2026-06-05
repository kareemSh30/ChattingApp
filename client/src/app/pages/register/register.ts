import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AccountService } from '../../services/account-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private accountService = inject(AccountService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  username = signal('');
  email = signal('');
  password = signal('');

  register() {
    const model = { username: this.username(), email: this.email(), password: this.password() };
    this.accountService.register(model).subscribe({
      next: (response) => {
        this.toastr.success('Registration successful');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.toastr.error(error.error || 'Registration failed');
      }
    });
  }
}
