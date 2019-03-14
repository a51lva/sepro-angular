import { HttpHeaders } from '@angular/common/http';

export class RequestOption {

    httpRequestOptions(isAuthenticated,token){
        let httpHeaders = {
            'Content-Type':  'application/json'
        };
        
        if(isAuthenticated){
            httpHeaders['Authorization'] = token;
        }

        const httpOptions = {
            headers: new HttpHeaders(httpHeaders)
        };
        
        return httpOptions;
    }
}
