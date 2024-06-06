import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { ChatService } from './chat.service';
import { Channel, LocalNotifications } from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socket: any;

  constructor(protected chatService: ChatService) {}

  GoOnline() {
    this.socket = io('http://10.88.202.145:3001', {
      withCredentials: true,
      extraHeaders: {
        'my-custom-header': 'abcd',
      },
    });

    //  this.socket.on('update', (data: any) => {});
    this.socket.on('RECEIVE-MESSAGE', (data: any) => {
      this.visualizzaMessaggio(data);
    });

    this.socket.on('DELETED-MESSAGE', (data: any) => {
      console.log(data);
      console.log(this.chatService.currentChat);
      this.chatService.currentChat = this.chatService.currentChat.filter(
        (message: any) => message.Id !== data.id
      );
      console.log(this.chatService.currentChat);
    });

    this.socket.on(`NEW-MESSAGE`, async (data: any) => {
      //invia messaggio
      LocalNotifications.schedule({
        notifications: [
          {
            id: 1,
            title: 'Nuovo messaggio',
            body: data,
            schedule: { at: new Date(Date.now()) },
            attachments: undefined,
            actionTypeId: '',
          },
        ],
      });
      const newChannel: Channel = {
        id: '1',
        name: 'pill-buddy-notifications',
        description: 'Channel for handling pill buddy notifications',
        importance: 5,
        visibility: 1,
        vibration: true,
        sound: 'notif_bell.wav',
      };
      //await LocalNotifications.createChannel(newChannel);
      console.log(data);
      this.chatService.currentChat.unshift(data);
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
    this.chatService.currentChat.unshift(data);
  }

  joinRoom() {
    this.socket.emit('JOIN-CHAT', this.chatService.groupId);
  }
}
