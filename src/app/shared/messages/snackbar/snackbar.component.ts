import { Component, OnInit } from '@angular/core';
import { style, trigger, animate, transition, state } from '@angular/animations'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/do'

import { NotificationService } from '../notification.service';

@Component({
  selector: 'mt-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  animations: [
    trigger('snack-visibility', [
      state('hidden', style({
        opacity: 0,
        bottom: '0px'
      })), 
      state('visible', style({
        opacity: 1,
        bottom: '30px'
      })),
      transition('hidden => visible', animate('500ms 0s ease-in')),
      transition('visible => hidden', animate('500ms 0s ease-out'))
    ])
  ]
})
export class SnackbarComponent implements OnInit {

  message: string = 'Hello World'
  snackVisibility: string = 'hidden'

  constructor(private notificationService: NotificationService) { }

  ngOnInit(){
    this.notificationService.notifier.do(msg => {
        this.message = msg
        this.snackVisibility = 'visible'
      }).switchMap(msg => Observable.timer(3000))
      .subscribe(timer => this.snackVisibility = 'hidden')
  }
}
