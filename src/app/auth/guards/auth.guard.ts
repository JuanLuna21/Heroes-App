import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn,  CanMatchFn, Route, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})

export class AuthGuard implements CanActivateFn, CanMatchFn {

    constructor() { }

    CanMatchFn (route: Route, segments: UrlSegment[] ): boolean | Observable<boolean>   {

        throw new Error('Method no implemented');
        
    }

    CanActivateFn (route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean | Observable<boolean> {
        
        throw new Error("Method no implemented");
        
    }

    
    
}