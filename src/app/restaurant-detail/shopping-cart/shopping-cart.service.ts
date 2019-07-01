import { CartItem } from "./cart-item.model";
import { MenuItem } from "../menu-item/menu-item.model";
import { NotificationService } from "../../shared/messages/notification.service"
import { Injectable } from "@angular/core";

@Injectable()
export class ShoppingCartService {
    itens: CartItem[] = []

    constructor(private notificationService: NotificationService){}

    clear(){
        this.itens = []
    }

    addItem(item: MenuItem){
        let foundItem = this.itens.find(mItem => {return mItem.menuItem.id == item.id})
        if(foundItem){
            foundItem.quantity++;
        }else{
            this.itens.push(new CartItem(item))
        }
        this.notificationService.notify(`Você adicionou o item ${item.name}`)
    }

    removeItem(item: CartItem){
        this.itens.splice(this.itens.indexOf(item), 1)
        this.notificationService.notify(`Você removeu o item ${item.menuItem.name}`)
    }

    increaseQty(item: CartItem){
        item.quantity += 1 
    }
  
    decreaseQty(item: CartItem){
        item.quantity -= 1
        if(!item.quantity){
            this.removeItem(item)
        }
    }

    getCartItens(){
        return this.itens
    }

    total(): number{
        return this.itens
            .map(cItem => cItem.value())
            .reduce((prev, pos) => prev + pos, 1)
    }
}