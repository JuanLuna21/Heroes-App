import { Observable,tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { environments } from 'src/environments/enviroments';

@Injectable({providedIn: 'root'})
export class AuthService {

    private baseUrl = environments.baseUrl;
    private user?: User;
    
    constructor(private http: HttpClient) { }

    get currentUser(): User | undefined { 
        if ( !this.user ) return undefined
        return  structuredClone ( this.user );
    }

    login ( email: string, password: string ):Observable<User> {

        return this.http.get<User>(`${ this.baseUrl }/users/1`)
            .pipe (
                tap( user => this.user = user),
                tap( user => localStorage.setItem('token', 'asdasddsad.sadsadsa.sdsadas' )),
            
            );
    }



    logout (){
        this.user = undefined;
        localStorage.clear();
    }
    
}