import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/service/chat.service';
import { DataStorageService } from 'src/app/service/data-storage.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  constructor(
    protected chatService: ChatService,
    protected dataStorageService: DataStorageService
  ) {}

  idAdmin: string = '000';
  textToSend: string = '';

  ngOnInit() {
    this.chatService.getChat(this.chatService.groupId);
  }
}
