import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../menu-item/menu-item.model';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { RestaurantsService } from 'app/restaurants/restaurants.service';

@Component({
  selector: 'mt-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  menus: Observable<MenuItem[]>

  constructor(
    private route: ActivatedRoute,
    private restaurantsService: RestaurantsService
  ) {}

  addMenuItem(menuItem: MenuItem){
    console.log(menuItem)
  }

  ngOnInit(){
    this.menus = this.restaurantsService.menusOfRestaurant(this.route.parent.snapshot.params['id'])
  }
}
