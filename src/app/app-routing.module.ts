import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SuccessComponent } from './components/success/success.component';
import { AuthGuard } from './services/auth/auth.guard';
import { SuccessGuard } from './services/auth/success.guard';
import { ErrorComponent } from './components/error/error.component';


const routes: Routes = [
  { path: "", redirectTo: "admin", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "success", component: SuccessComponent, canActivate: [SuccessGuard], runGuardsAndResolvers: 'always' },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuard], runGuardsAndResolvers: 'always'},  
  { path: '**', component: ErrorComponent, runGuardsAndResolvers: 'always' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'} )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
