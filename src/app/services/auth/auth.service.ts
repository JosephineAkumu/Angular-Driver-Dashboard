import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = _firebaseAuth.authState;

    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
          localStorage.setItem("isLoggedIn", "true");
        } else {
          this.userDetails = null;
        }
      }
    );
  }


  login(email: string, password: string) {
    const credential = firebase.auth.EmailAuthProvider.credential(email, password);
    return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password)
  }


  isLoggedIn() {
    this.user = this._firebaseAuth.authState;

    if (localStorage.getItem("isLoggedIn") == null) {
      return false;
    } else {
      return true;
    }
  }

  /* Sign out */
  logout() {
    localStorage.clear();
    this._firebaseAuth.auth.signOut()
      .then((res) => this.router.navigate(['/']));
  }
}
