import { Component } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chats-list',
  templateUrl: './chats-list.component.html',
  styleUrl: './chats-list.component.css',
})
export class ChatsListComponent {
  try: any[] = [];

  constructor(protected chatService: ChatService) {}

  openChat(nChat: string) {
    this.chatService.isChatOpen = true;
    this.chatService.chatOpen = nChat;
    this.chatService.getChat(nChat);
    console.log(this.chatService.currentChat);
    //faccio una richiesta che ottiene i dati riguardanti la chat avente id passato come parametro,
    //poi la assegno a chatService.chat, per poi visualizzarla con un @for dentro chat.component.html
  }

  ngOnInit() {
    this.chatService.getChatList();
    this.chatService.getLastMessage();
  }
}
