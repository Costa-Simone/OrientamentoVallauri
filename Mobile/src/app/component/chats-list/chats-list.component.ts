import { Component } from '@angular/core';
import { ChatService } from 'src/app/service/chat.service';
import { SocketService } from 'src/app/service/socket.service';


@Component({
  selector: 'app-chats-list',
  templateUrl: './chats-list.component.html',
  styleUrl: './chats-list.component.css',
})
export class ChatsListComponent {
  try: any[] = [];

  constructor(
    protected chatService: ChatService,
    protected socketService: SocketService
  ) {}

  openChat(nChat: string) {
    this.chatService.isChatOpen = true;
    this.chatService.chatOpen = nChat;
    this.chatService.getChat(nChat);
    //faccio una richiesta che ottiene i dati riguardanti la chat avente id passato come parametro,
    //poi la assegno a chatService.chat, per poi visualizzarla con un @for dentro chat.component.html
  }

  async ngOnInit() {
    await this.chatService.getChatList();
    await this.chatService.getLastMessage(this.chatService.chatList);
    console.log(this.chatService.latestMessages);
    this.socketService.GoOnline();
    this.socketService.joinRoom();
  }
}
