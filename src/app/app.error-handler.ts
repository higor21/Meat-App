import { Observable } from "rxjs/Observable";
import { Response } from "@angular/http"

export class ErrorHandler {
    static handleError(error: Response | any): Observable<any>{
        let errorMessage: string
        if(error instanceof Response){
            errorMessage = `Erro $(error.status) ao acessar a URL $(error.url) - $(error.statusText)` 
        }else{
            errorMessage = error.toString()
        }
        return Observable.throw(errorMessage)
    }
}