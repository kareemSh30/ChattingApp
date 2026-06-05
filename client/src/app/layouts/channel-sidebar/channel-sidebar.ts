import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account-service';

@Component({
  selector: 'app-channel-sidebar',
  imports: [],
  templateUrl: './channel-sidebar.html',
  styleUrl: './channel-sidebar.css',
})
export class ChannelSidebar {
  protected accountService = inject(AccountService);
  private router = inject(Router);

  ngOnInit() {
    this.accountService.loadCurrentUser();
    this.setCurrentUser();
  }
  setCurrentUser() {
    const user = localStorage.getItem('user');
    if (user) {
      this.accountService.currentUser.set(JSON.parse(user));
    }
  }
  logout() {
    this.accountService.logout();
    this.router.navigate(['/']);
  } 
}
