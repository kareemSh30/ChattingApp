import { Component, inject, OnInit } from '@angular/core';
import { ChannelSidebar } from '../../layouts/channel-sidebar/channel-sidebar';
import { ChatHeaderComponent } from '../../layouts/chat-header/chat-header';
import { MessageList } from '../../layouts/message-list/message-list';
import { MessageInputComponent } from '../../layouts/message-input/message-input';
import { ServerSidebar } from '../../layouts/server-sidebar/server-sidebar';
import { ChannelService } from '../../services/channel.service';

@Component({
  selector: 'app-main-chat',
  standalone: true,
  imports: [
    ChannelSidebar,
    ChatHeaderComponent,
    MessageList,
    MessageInputComponent,
    ServerSidebar
  ],
  templateUrl: './main-chat.html',
})
export class MainChat implements OnInit {
  channelService = inject(ChannelService);

  // hardcoded for now — will come from server selection later
  private activeServerId = '1';

  ngOnInit() {
    this.channelService.getChannels(this.activeServerId).subscribe();
  }
}