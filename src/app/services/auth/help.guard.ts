import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

@Injectable()
export class HelpGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
      return true;
  }
}
