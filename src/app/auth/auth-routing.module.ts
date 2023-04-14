import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NbAuthComponent } from '@nebular/auth';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  {
    path: '', component: NbAuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: '',
        redirectTo: "login",
        pathMatch: "full"
      }
    ]
  },
  { path: "logout", component: LogoutComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
