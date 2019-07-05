import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { NotificationService } from 'app/shared/messages/notification.service';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  navegateTo: string

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  login(){
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        user => this.notificationService.notify(`Bem vindo, ${user.name}!`),
        // o atributo 'message' abaixo foi definido no backend como o body de retorno
        response => this.notificationService.notify(response.error.message),
        // o terceiro parâmetro indica para onde se de navegar após o subscribe
        () => this.router.navigate([atob(this.navegateTo)])
      )
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.minLength(8)])
    })

    this.navegateTo = this.route.snapshot.params['to'] || btoa('/')
  }
}
