import { Component } from '@angular/core';
import { Route, Router, RouterModule } from '@angular/router';
import { ChatService } from 'src/app/service/chat.service';
import { SocketService } from 'src/app/service/socket.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent {
  constructor(
    protected chatService: ChatService,
    private router: Router,
    protected socketService: SocketService
  ) {}

  ngOnInit() {
    this.chatService.groupId =
      localStorage.getItem('groupId')?.toString() || '';
    console.log(this.chatService.groupId);

    if (!this.socketService.isOnline) {
      this.socketService.GoOnline();
      this.socketService.isOnline = true;
    }
  }

  async openChat(user: string) {
    console.log(user);
    this.chatService.chatOpened = user;
    this.router.navigate(['/home/chat/' + user]);

    if (user == '000') this.socketService.joinRoom(this.chatService.groupId);
    else this.socketService.joinRoom(user);
  }
  onLogOut() {
    localStorage.removeItem('groupId');
    // this.router.navigate(['/'])
    window.location.href = '/';
  }
}
