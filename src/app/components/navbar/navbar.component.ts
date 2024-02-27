import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(public login:LoginService){}

  public logout(){
    this.login.logout();
    window.location.reload();
  }
}
