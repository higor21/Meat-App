
class OrderItem {
    constructor(
        public menuId: string,
        public quantity: number
    ){}
}

class Order {
    constructor(
        public address: string,
        public number: number,
        public optional: string,
        public paymentOption: string,
        public orderItens: OrderItem[]
    ){}
}

export {Order, OrderItem}