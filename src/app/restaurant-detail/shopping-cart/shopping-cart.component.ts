import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';
import { CartItem } from './cart-item.model';

@Component({
  selector: 'mt-shopping-cart',
  templateUrl: './shopping-cart.component.html'
})
export class ShoppingCartComponent implements OnInit {

  constructor(
    private shoppingCartService: ShoppingCartService
  ) {}

  clear(){
    this.shoppingCartService.clear()
  }

  removeItem(item: any){
    this.shoppingCartService.removeItem(item)
  }

  addItem(item: any){    
    this.shoppingCartService.addItem(item)
  }

  itens(): CartItem[] {
    console.log(this.shoppingCartService.itens)
    return this.shoppingCartService.itens
  }

  value(): number {
    return this.shoppingCartService.total()
  }

  ngOnInit() {}
}
