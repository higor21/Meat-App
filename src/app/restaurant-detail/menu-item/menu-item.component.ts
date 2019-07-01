import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenuItem } from './menu-item.model';
import { state, transition, trigger, style, animate} from '@angular/animations'

@Component({
  selector: 'mt-menu-item',
  templateUrl: './menu-item.component.html',
  animations: [
    trigger('menuItemAppear', [
      state('ready', style({ opacity: 1 })),
      transition('void => ready', [
        style({opacity: 0, transform: 'translateY(-50px)'}),
        animate('400ms 0s ease-in')
      ])
    ])
  ]
})
export class MenuItemComponent implements OnInit {

  @Input() menuItem: MenuItem
  @Output() add = new EventEmitter()

  menuItemState: string = 'ready'

  constructor() { }

  emitAddEvent(){
    this.add.emit(this.menuItem)
  }

  ngOnInit() {}
}
