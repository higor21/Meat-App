import { Component, OnInit, Input } from '@angular/core';
import { Restaurant } from './restaurant.model';
import { state, transition, trigger, style, animate} from '@angular/animations'

@Component({
  selector: 'mt-restaurant',
  templateUrl: './restaurant.component.html',
  animations: [
    trigger('restaurantAppear', [
      state('ready', style({ opacity: 1 })),
      transition('void => ready', [
        style({opacity: 0, transform: 'translate(-50px, -50px)'}),
        animate('400ms 0s ease-in-out')
      ])
    ])
  ]
})
export class RestaurantComponent implements OnInit {

  @Input() restaurant: Restaurant
  restaurantState = 'ready'

  constructor() { }

  ngOnInit() {}
}
