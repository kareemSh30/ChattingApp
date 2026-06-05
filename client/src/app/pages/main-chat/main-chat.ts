import { Component, inject } from '@angular/core';
import { AccountService } from '../../services/account-service';
import { Router } from '@angular/router';
import { ChannelSidebar } from "../../layouts/channel-sidebar/channel-sidebar";
import { ChatHeader } from "../../layouts/chat-header/chat-header";
import { MessageInput } from "../../layouts/message-input/message-input";
import { MessageItem } from "../../layouts/message-item/message-item";

@Component({
  selector: 'app-main-chat',
  imports: [ChannelSidebar, ChatHeader, MessageInput, MessageItem],
  templateUrl: './main-chat.html',
  styleUrl: './main-chat.css',
})
export class MainChat {
  
}
