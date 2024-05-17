import { Component } from '@angular/core';
import { Route, Router, RouterModule } from '@angular/router';
import { ChatService } from 'src/app/service/chat.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent {
  constructor(protected chatService: ChatService, private router: Router) {}

  ngOnInit() {
    this.chatService.groupId =
      localStorage.getItem('groupId')?.toString() || '';
    console.log(this.chatService.groupId);
  }

  openChat(user: string) {
    console.log(user);
    this.chatService.getChat(user);
    this.router.navigate(['/home/chat/' + user]);
  }
}
