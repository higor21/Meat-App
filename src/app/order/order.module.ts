import { NgModule } from "@angular/core";
import { DeliveryCostsComponent } from "./delivery-costs/delivery-costs.component";
import { OrderItensComponent } from "./order-itens/order-itens.component";
import { OrderComponent } from "./order.component";
import { SharedModule } from "app/shared/shared.module";
import { RouterModule, Routes } from "@angular/router";

export const ROUTES: Routes = [
    {path: '', component: OrderComponent}
]

@NgModule({
    declarations: [
        DeliveryCostsComponent,
        OrderItensComponent,
        OrderComponent
    ],
    imports: [
        SharedModule, RouterModule.forChild(ROUTES)
    ]
})

export class OrderModule {}