import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { MEAT_API } from "app/app.api";
import { User } from "./user.interface";
import { Router, NavigationEnd } from "@angular/router";
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/filter'

@Injectable()
export class LoginService/*  implements OnInit */ {
    user: User
    lastUrl: string

    constructor(
        private http: HttpClient,
        private router: Router
    ){
        this.router.events
            .filter(e => e instanceof NavigationEnd)
            .subscribe( (e: NavigationEnd) => this.lastUrl = e.url)
    }

    isLoggedIn(): boolean{
        return this.user !== undefined
    }

    handleLogin(path: string = this.lastUrl){
        // path é o caminho para onde quero navegar após a autenticação
        this.router.navigate(['/login', btoa(path)])
    }

    login(email: string, password: string): Observable<User>{
        return this.http.post<User>(`${MEAT_API}/login`, {email: email, password: password})
                    .do(user => this.user = user)
    }

    logout(){
        this.user = undefined
    }

/*     ngOnInit(){
        console.log('fasdfa')
        this.router.events
            .filter(e => e instanceof NavigationEnd)
            .subscribe( (e: NavigationEnd) => this.lastUrl = e.url)
    } */
}