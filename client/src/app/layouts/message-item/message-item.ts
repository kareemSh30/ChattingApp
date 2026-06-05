import { Component, inject, input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AccountService } from '../../services/account-service';
import { IMessage } from '../../interfaces/Ichannel';

@Component({
  selector: 'app-message-item',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './message-item.html',
})
export class MessageItemComponent {
  accountService = inject(AccountService);
  
  message = input.required<IMessage>();

  getAvatarLetter(username: string): string {
    return username.charAt(0).toUpperCase();
  }

  isOwnMessage(): boolean {
    return this.message().senderUsername === this.accountService.currentUser()?.username;
  }
}