import { Injectable } from "@angular/core";
import { ShoppingCartService } from "app/restaurant-detail/shopping-cart/shopping-cart.service";
import { CartItem } from "app/restaurant-detail/shopping-cart/cart-item.model";
import { Order } from "./order.model";
import { Observable } from "rxjs/Observable";
import { Http, Headers, RequestOptions } from "@angular/http";
import { MEAT_API } from "app/app.api";

@Injectable()
export class OrderService {

    constructor(
        private cartService: ShoppingCartService,
        private http: Http
    ){}

    increaseQty(item: CartItem){
        this.cartService.increaseQty(item)
    }
  
    decreaseQty(item: CartItem){
        this.cartService.decreaseQty(item)
    }
    
    remove(item: CartItem){
        this.cartService.removeItem(item)
    }

    cartItens(){
        return this.cartService.getCartItens()
    }

    checkOrder(order: Order): Observable<string> {
        let headers = new Headers()
        headers.append('Content-type', 'application/json')
        return  this.http.post(`${MEAT_API}/orders`,
                                JSON.stringify(order),
                                new RequestOptions({headers: headers})
                            )
                            .map(response => response.json())
                            .map(order => order.id)
    }

    clear(){
        this.cartService.clear()
    }

    itensValue(): number{
        return this.cartService.total()
    }
}