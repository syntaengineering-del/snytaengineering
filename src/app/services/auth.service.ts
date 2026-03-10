import { Injectable } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user$: Observable<User | null>;

    constructor(private auth: Auth) {
        this.user$ = authState(this.auth);
    }

    login(email: string, pass: string) {
        return signInWithEmailAndPassword(this.auth, email, pass);
    }

    logout() {
        return signOut(this.auth);
    }

    get isLoggedIn$(): Observable<boolean> {
        return this.user$.pipe(map(user => !!user));
    }
}
