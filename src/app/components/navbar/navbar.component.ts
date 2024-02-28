import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent{
  // user:any={};  // Change the type to match the expected user type

  constructor(public login: LoginService) {}

  // ngOnInit(): void {
  // this.user=this.login.getUser();
  // console.log(`Inside OnInit of navbar ${this.user}`);
  // }

  public logout(){
    this.login.logout();
    window.location.reload();
  }
}
