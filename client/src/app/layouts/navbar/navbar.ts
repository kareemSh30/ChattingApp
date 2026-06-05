import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AccountService } from '../../services/account-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  accountService = inject(AccountService);
  private router = inject(Router);

  logout() {
    this.accountService.logout();
    this.router.navigate(['/']);
  }
}
