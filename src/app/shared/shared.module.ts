import { NgModule, ModuleWithProviders } from "@angular/core";
import { RatingComponent } from "./rating/rating.component";
import { InputComponent } from "./input/input.component";
import { RadioComponent } from "./radio/radio.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ShoppingCartService } from "app/restaurant-detail/shopping-cart/shopping-cart.service";
import { RestaurantsService } from "app/restaurants/restaurants.service";
import { OrderService } from "app/order/order.service";
import { SnackbarComponent } from './messages/snackbar/snackbar.component';
import { NotificationService } from "./messages/notification.service";
import { LoginService } from "app/security/login/login.service";
import { LoggedInGuard } from "app/security/loggedin.guard";
import { LeaveOrderGuard } from "app/order/leave-order.guard";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "app/security/auth.interceptor";

@NgModule({
    declarations: [RatingComponent, InputComponent, RadioComponent, SnackbarComponent],
    imports: [FormsModule, ReactiveFormsModule, CommonModule],
    exports: [
        RatingComponent, InputComponent, RadioComponent, SnackbarComponent,
        FormsModule, ReactiveFormsModule, CommonModule
    ]
})
export class SharedModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                ShoppingCartService,
                RestaurantsService,
                OrderService,
                NotificationService,
                LoginService,
                LoggedInGuard,
                LeaveOrderGuard,
                // registrando os interceptors
                {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
            ]
        }
    }
}