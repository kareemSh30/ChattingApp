import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AccountService } from '../../services/account-service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private accountService = inject(AccountService);
  private router = inject(Router);
  creds: any = {};
  errorMessage = '';

  login() {
    this.accountService.login(this.creds).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['/main-chat']);
      },
      error: (error) => {
        this.errorMessage = error.error || 'Invalid email or password';
      }
    });
  }
}
