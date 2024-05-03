import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { SOCKET_SERVER } from '../../../env';
import { ChatService } from './chat.service';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socket: any;

  constructor(protected chatService: ChatService) {}

  GoOnline() {
    this.socket = io(SOCKET_SERVER, {
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
  }

  sendMessage(message: any) {
    console.log(message);
    this.socket.emit('SEND-MESSAGE', message);
  }

  GoOffline() {
    this.socket.disconnect();
  }

  visualizzaMessaggio(data: any) {
    console.log(data);
    this.chatService.currentChat.push(data);
  }
}
