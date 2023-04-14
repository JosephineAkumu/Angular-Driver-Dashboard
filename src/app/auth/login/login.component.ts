import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { NbLoginComponent, NbAuthService, NB_AUTH_OPTIONS } from '@nebular/auth';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends NbLoginComponent implements OnInit {
  loginForm: any;
  loading = false;
  token: string;
  currentUser: any;
  error: any;


  constructor(
    private authService: AuthService,
    public service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options: {},
    public cd: ChangeDetectorRef,
    public router: Router,
    private toastr: NbToastrService
  ) {
    super(service, options, cd, router);
  }

  ngOnInit(): void {
    this.authService.logout();

    this.loginForm = new FormGroup({
      email: new FormControl('email', Validators.email),
      password: new FormControl()
    });

  }

  loginUser(data: any, ) {
    this.loading = true;
    this.currentUser = { email: data.email, password: data.password };
    this.authService.login(data.email, data.password)
      .then((res) => {

        this.router.navigate(['/admin']);
        this.loading = false
      })
      .catch((err) => {
        this.toastr.danger("Unable to login", "Error");
        this.loading = false
      });

    //@ts-ignore    
    this.router.navigate(["/"]);

  }

}
