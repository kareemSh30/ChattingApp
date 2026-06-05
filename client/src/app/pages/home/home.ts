import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AccountService } from '../../services/account-service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  protected accountService = inject(AccountService);
  private http = inject(HttpClient);
  protected users = signal<any>([]);

  async ngOnInit() {
    this.users.set(await this.getUsers());
  }

  setCurrentUser() {
    const user = localStorage.getItem('user');
    if (user) {
      this.accountService.currentUser.set(JSON.parse(user));
    }
  }

  async getUsers() {
    try {
      return lastValueFrom(this.http.get('http://localhost:5001/api/users'));
    } catch (error) { 
      console.error('Error fetching users:', error);
      throw error;
    }
  }
}
