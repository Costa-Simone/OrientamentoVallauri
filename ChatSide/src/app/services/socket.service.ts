import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { ChatService } from './chat.service';
import { ChatsListComponent } from '../components/chats-list/chats-list.component';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socket: any;

  constructor(protected chatService: ChatService) {}

  GoOnline() {
    this.socket = io('http://79.25.227.23:80', {
      withCredentials: true,
      extraHeaders: {
        'my-custom-header': 'abcd',
      },
    });

    this.socket.emit('online', { id: '000' });

    //  this.socket.on('update', (data: any) => {});
    this.socket.on('RECEIVE-MESSAGE', (data: any) => {
      this.chatService.currentChat.push(data);
      console.log(this.chatService.currentChat); //potenzialmente inutile
    });

    this.socket.on('DELETED-MESSAGE', (data: any) => {
      this.chatService.currentChat = this.chatService.currentChat.filter(
        (msg: any) => msg.Id != data
      );

      this.chatService.latestMessages[
        this.chatService.chatList.indexOf(this.chatService.chatOpen)
      ] = this.chatService.currentChat[
        this.chatService.currentChat.length - 1
      ] || { Id: 'noId', Testo: 'Nessun messaggio', Orario: '' };
      console.log(this.chatService.latestMessages);
    });

    this.socket.on('INSERTED-MESSAGE', (data: any) => {
      //messaggio inserito nel db
      console.log(data);
      this.chatService.currentChat.push(data);
      this.chatService.latestMessages[
        this.chatService.chatList.indexOf(this.chatService.chatOpen)
      ] = data;
    });

    this.socket.on('NEW-MESSAGE', async (data: any) => { //messaggio ricevuto
      console.log(data);
      console.log(data.IdMittente + " DEST; " + this.chatService.chatOpen + " CHAT OPEN")
      if(data.IdDestinatario == this.chatService.chatOpen) {
        this.chatService.currentChat.push(data);
      } 

      //console.log(data.IdMittente, this.chatService.chatOpen);
      if (data.IdMittente == this.chatService.chatOpen)
        this.chatService.currentChat.push(data);
    });
  }

  sendMessage(message: any) {
    this.socket.emit('SEND-MESSAGE', message);
  }

  GoOffline() {
    this.socket.disconnect();
  }

  deleteMessage(id: string, idDestinatario: string) {
    this.socket.emit('DELETE-MESSAGE', { id, idDestinatario });
  }

  joinRoom() {
    this.socket.emit('JOIN-CHAT', '000');
  }
}
