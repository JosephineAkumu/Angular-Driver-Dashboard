import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnChanges{
  userIsLoggedIn: Boolean = false;
  user: any;

  constructor(private authService: AuthService, public router: Router) { }

  ngOnInit() {
    if (localStorage.getItem("currentUser")) {
      // logged in so return true
      this.userIsLoggedIn = true;

      this.user = JSON.parse(localStorage.getItem("currentUser"));
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (localStorage.getItem("currentUser")) {
      // logged in so return true
      this.userIsLoggedIn = true;
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/auth/login"]);
    localStorage.setItem("loggedOut", "true");
  }

}
