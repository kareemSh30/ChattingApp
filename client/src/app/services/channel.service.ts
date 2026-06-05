import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IChannel } from '../interfaces/Ichannel';
import { IMessage } from '../interfaces/Ichannel';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChannelService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:5001/api/';

  channels = signal<IChannel[]>([]);
  activeChannel = signal<IChannel | null>(null);
  messages = signal<IMessage[]>([]);
  isLoadingMessages = signal(false);

  getChannels(serverId: string) {
    return this.http.get<IChannel[]>(`${this.baseUrl}servers/${serverId}/channels`).pipe(
      tap(channels => {
        this.channels.set(channels);
        if (channels.length > 0 && !this.activeChannel()) {
          this.setActiveChannel(channels[0]);
        }
      })
    );
  }

  setActiveChannel(channel: IChannel) {
    this.activeChannel.set(channel);
    this.loadMessages(channel.id);
  }

  loadMessages(channelId: string) {
    this.isLoadingMessages.set(true);
    return this.http.get<IMessage[]>(`${this.baseUrl}channels/${channelId}/messages`).pipe(
      tap(messages => {
        this.messages.set(messages);
        this.isLoadingMessages.set(false);
      })
    ).subscribe();
  }

  sendMessage(channelId: string, content: string) {
    return this.http.post<IMessage>(`${this.baseUrl}channels/${channelId}/messages`, { content }).pipe(
      tap(message => {
        this.messages.update(msgs => [...msgs, message]);
      })
    );
  }
}