import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { ChatService } from './chat.service';
import { Channel, LocalNotifications } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class SocketService {

  socket: any;
  permission: any

  constructor(protected chatService: ChatService) { }

  GoOnline() {
    this.socket = io('http://localhost:80', {
      withCredentials: true,
      extraHeaders: {
        'my-custom-header': 'abcd',
      },
    });


    this.socket.on('RECEIVE-MESSAGE', (data: any) => {
      this.chatService.getChat();
    });

    this.socket.on('DELETED-MESSAGE', (data: any) => {
      console.log(data);

      this.chatService.getChat();
    });

    this.socket.on(`NEW-MESSAGE`, async (data: any) => {
      console.log(data);
      this.chatService.getChat();
    });

    this.socket.on(`INSERTED-MESSAGE`, async (data: any) => {
      console.log(data);
      this.chatService.getChat();
    });


  }

  async getPermission() {
    //this.permission = await LocalNotifications.requestPermissions()
  }

  sendMessage(message: any) {
    this.socket.emit('SEND-MESSAGE', message);
  }

  joinRoom(user: string) {
    console.log("entro nella room " + user);

    this.socket.emit('JOIN-CHAT', user);
  }

  leaveRoom(id: string) {
    console.log("esco da tutte le room");

    this.socket.emit("LEAVE-CHAT", id);
    this.socket.emit("LEAVE-CHAT", "999");

  }
}