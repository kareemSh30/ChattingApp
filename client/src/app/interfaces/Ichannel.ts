
export interface IMessage {
  id: string;
  content: string;
  senderUsername: string;
  senderPhotoUrl?: string;
  sentAt: Date;
  channelId: string;
}

// src/app/core/interfaces/Ichannel.ts
export interface IChannel {
  id: string;
  name: string;
  serverId: string;
}

// src/app/core/interfaces/Iserver.ts
export interface IServer {
  id: string;
  name: string;
  imageUrl?: string;
}