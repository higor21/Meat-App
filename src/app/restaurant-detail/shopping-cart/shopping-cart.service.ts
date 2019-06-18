import { CartItem } from "./cart-item.model";
import { MenuItem } from "../menu-item/menu-item.model";

export class ShoppingCartService {
    itens: CartItem[] = []

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
    }

    removeItem(item: CartItem){
        this.itens.splice(this.itens.indexOf(item), 1)
    }

    increaseQty(item: CartItem){
        item.quantity += 1 
    }
  
    decreaseQty(item: CartItem){
        item.quantity -= 1
        if(!item.quantity){
            console.log('chegou')
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