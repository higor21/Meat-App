import { Component, OnInit } from '@angular/core';
import { RadioOption } from 'app/shared/radio/radio-option.model';
import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item.model';
import { OrderService } from './order.service';
import { Order, OrderItem } from './order.model';
import { Router } from '@angular/router'

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  delivery: number = 8

  paymentOptions: RadioOption[] = [
    new RadioOption('Dinheiro', 'MON'),
    new RadioOption('Cartão de Débito', 'DEB'),
    new RadioOption('Cartão Refeição', 'REF')
  ]

  constructor(
    private orderService: OrderService,
    private router: Router
  ){ }

  increaseQty(item: CartItem){
    this.orderService.increaseQty(item)
  }

  decreaseQty(item: CartItem){
    this.orderService.decreaseQty(item)
  }

  remove(item: CartItem){
    this.orderService.remove(item)
  }

  cartItens(){
    return this.orderService.cartItens()
  }

  itensValue(): number{
    return this.orderService.itensValue()
  }

  checkOrder(order: Order){
    order.orderItens = this.orderService.cartItens()
                        .map((item: CartItem) => new OrderItem(item.menuItem.id, item.quantity))
    this.orderService.checkOrder(order).subscribe((orderId: string) => {
      //console.log(`Compra concluída: ${orderId}`)
      this.orderService.clear()
      this.router.navigate(['/order-sumary'])
    })
  }

  ngOnInit() {}
}
