import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { Navbar } from "./layouts/navbar/navbar";
import { AccountService } from './services/account-service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private accountService = inject(AccountService);
  private router = inject(Router);
  showNavbar = true;

  ngOnInit() {
    this.accountService.loadCurrentUser();

    // Hide navbar on full-screen pages like main-chat
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.showNavbar = !event.urlAfterRedirects.startsWith('/main-chat');
      });

    // Also check the initial route
    this.showNavbar = !this.router.url.startsWith('/main-chat');
  }
}
