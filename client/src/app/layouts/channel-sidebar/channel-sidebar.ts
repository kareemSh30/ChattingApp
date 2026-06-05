import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account-service';
import { ChannelService } from '../../services/channel.service';
import { IChannel } from '../../interfaces/Ichannel';

@Component({
  selector: 'app-channel-sidebar',
  imports: [],
  templateUrl: './channel-sidebar.html',
  styleUrl: './channel-sidebar.css',
})
export class ChannelSidebar {
  protected accountService = inject(AccountService);
  private router = inject(Router);

  channelService = inject(ChannelService);
  serverName = input<string>('Angular Community');

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
   selectChannel(channel: IChannel) {
    this.channelService.setActiveChannel(channel);
  }

  isActive(channel: IChannel): boolean {
    return this.channelService.activeChannel()?.id === channel.id;
  }
}
