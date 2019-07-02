import { Component, OnInit } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantsService } from './restaurants.service';
import { trigger, animate, transition, state, style } from '@angular/animations'
import { FormBuilder, FormGroup, FormControl } from '@angular/forms'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/from'
import 'rxjs/add/operator/debounceTime' // espera um tempo mínimo para fazer uma nova requisição
import 'rxjs/add/operator/distinctUntilChanged' // faz uma nova requisição apenas se a mesma for distinta da anterior
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger('toggleSearch', [
      state('visible', style({
        opacity: 1,
        "max-height":"70px",
        "margin-top":"20px"
      })),
      state('hidden', style({
        opacity: 0,
        "max-height":"0px"
      })),
      transition('* => *', animate('300ms 0s ease-in-out'))
    ])
  ]
})
export class RestaurantsComponent implements OnInit {

  restaurants: Restaurant[]
  searchForm: FormGroup
  searchControl: FormControl
  searchBarState: string = 'hidden'

  constructor(
    private restaurantsService: RestaurantsService,
    private fb: FormBuilder
  ){}

  toggleSearchBar(){
    this.searchBarState = this.searchBarState == 'hidden' ? 'visible' : 'hidden'
  }

  ngOnInit() {

    this.searchControl = this.fb.control('')
    this.searchForm = this.fb.group({
      searchForm: this.searchControl
    })

    this.searchControl.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .switchMap(search => this.restaurantsService.restaurants(search))
      .catch(error => Observable.from([])) //serve para não quebrar a página, caso o backend esteja inativo
      .subscribe(rests => this.restaurants = rests)

    this.restaurantsService.restaurants().subscribe(rests => this.restaurants = rests)
  }
}
