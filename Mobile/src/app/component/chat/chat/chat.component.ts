import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/service/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  constructor(protected chatService: ChatService) {}

  idAdmin: string = '000';
  textToSend: string = '';

  ngOnInit() {}
}
