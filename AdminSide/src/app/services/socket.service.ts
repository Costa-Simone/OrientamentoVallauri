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
    this.socket = io("ws://localhost:3000", {
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
      console.log(this.chatService.currentChat);

      this.chatService.latestMessages[
        this.chatService.chatList.indexOf(this.chatService.chatOpen)
      ] = this.chatService.currentChat[this.chatService.currentChat.length - 1];

    });

    this.socket.on("update", (data: any) => {
      
    })
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

  deleteMessage(id: string) {
    this.socket.emit('DELETE-MESSAGE', id);
  }
}
