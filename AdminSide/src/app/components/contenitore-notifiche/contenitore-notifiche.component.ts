import { Component } from '@angular/core';
import { NotificaComponent } from '../notifica/notifica.component';
import { NotificheService } from '../../services/notifiche.service';
import { animazione } from '../../models/animazione.module';

@Component({
  selector: 'ContenitoreNotifiche',
  templateUrl: './contenitore-notifiche.component.html',
  styleUrls: ['./contenitore-notifiche.component.scss'],
  imports: [NotificaComponent],
  animations: [animazione],
  standalone: true
})
export class ContenitoreNotificheComponent{

  constructor(public notifiche: NotificheService) { }

}
