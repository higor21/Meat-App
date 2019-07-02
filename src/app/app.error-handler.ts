import { Observable } from "rxjs/Observable";
import { HttpErrorResponse } from "@angular/common/http"

export class ErrorHandler {
    static handleError(error: HttpErrorResponse | any): Observable<any>{
        let errorMessage: string
        if(error instanceof HttpErrorResponse){
            const body = error.error
            errorMessage = `${error.url}: ${error.status} - ${error.statusText || ''} ${body}` 
        }else{
            errorMessage = error.message ? error.message : error.toString()
        }
        return Observable.throw(errorMessage)
    }
}