import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { ChatService } from './chat.service';
import {Channel, LocalNotifications} from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class SocketService {

  socket: any;
  permission: any

  constructor(protected chatService: ChatService) {}

  GoOnline() {
    this.socket = io('http://82.54.53.212:80', {
      withCredentials: true,
      extraHeaders: {
        'my-custom-header': 'abcd',
      },
    });


    this.socket.on('RECEIVE-MESSAGE', (data: any) => {
      this.visualizzaMessaggio(data);
    });

    this.socket.on('DELETED-MESSAGE', (data: any) => {
      console.log(data);

      this.chatService.getChat();
    });

    this.socket.on(`NEW-MESSAGE`,async (data: any) => {
      console.log(data);
      this.chatService.currentChat.unshift(data);
    });
    
    this.socket.on(`INSERTED-MESSAGE`,async (data: any) => {
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

  visualizzaMessaggio(data: any) {
    this.chatService.currentChat.unshift(data);
  }

  joinRoom(user : string) {
    console.log("entro nella room " + user);
    this.socket.emit('JOIN-CHAT', user);

  }

  leaveRoom(id: string) {
    console.log("esco da tutte le room");

    this.socket.emit("LEAVE-CHAT", id);

  }
}