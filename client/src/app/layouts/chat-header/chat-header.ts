// src/app/features/main-chat/chat-header/chat-header.component.ts
import { Component, inject } from '@angular/core';
import { ChannelService } from '../../services/channel.service';

@Component({
  selector: 'app-chat-header',
  standalone: true,
  templateUrl: './chat-header.html',
})
export class ChatHeaderComponent {
  channelService = inject(ChannelService);
}