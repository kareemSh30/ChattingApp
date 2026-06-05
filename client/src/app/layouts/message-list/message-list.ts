import { Component, inject } from '@angular/core';
import { ChannelService } from '../../services/channel.service';
import { MessageItemComponent } from '../message-item/message-item';

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [MessageItemComponent],
  templateUrl: './message-list.html',
})
export class MessageList {
  channelService = inject(ChannelService);
}
