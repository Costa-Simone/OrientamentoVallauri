import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { ChatService } from './chat.service';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socket: any;

  constructor(protected chatService: ChatService) {}

  GoOnline() {
    this.socket = io('http://10.88.252.182:3001', {
      withCredentials: true,
      extraHeaders: {
        'my-custom-header': 'abcd',
      },
    });

    this.socket.emit('online', { id: '000' });

    //  this.socket.on('update', (data: any) => {});
    this.socket.on('RECEIVE-MESSAGE', (data: any) => {
      this.visualizzaMessaggio(data);
    });

    this.socket.on('DELETED-MESSAGE', (data: any) => {
      console.log(data);
      this.chatService.currentChat = this.chatService.currentChat.filter(
        (msg: any) => msg.Id != data
      );
    });

    this.socket.on(`NEW-MESSAGE`, (data: any) => {
      console.log(data);
      this.chatService.currentChat.push(data);
    });
  }

  sendMessage(message: any) {
    this.socket.emit('SEND-MESSAGE', message);
  }

  GoOffline() {
    this.socket.disconnect();
  }

  visualizzaMessaggio(data: any) {
    this.chatService.currentChat.push(data);
  }

  joinRoom() {
    this.socket.emit('JOIN-CHAT', this.chatService.groupId);
  }
}