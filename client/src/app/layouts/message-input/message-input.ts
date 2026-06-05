// src/app/features/main-chat/message-input/message-input.component.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChannelService } from '../../services/channel.service';

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './message-input.html',
})
export class MessageInputComponent {
  channelService = inject(ChannelService);

  messageText = signal('');
  isSending = signal(false);

  get placeholder(): string {
    const channel = this.channelService.activeChannel();
    return channel ? `Message #${channel.name}` : 'Select a channel first';
  }

  get canSend(): boolean {
    return this.messageText().trim().length > 0
      && !!this.channelService.activeChannel()
      && !this.isSending();
  }

  sendMessage() {
    if (!this.canSend) return;

    const channelId = this.channelService.activeChannel()!.id;
    const content = this.messageText().trim();

    this.isSending.set(true);

    this.channelService.sendMessage(channelId, content).subscribe({
      next: () => {
        this.messageText.set('');
        this.isSending.set(false);
      },
      error: () => {
        this.isSending.set(false);
      }
    });
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }
}