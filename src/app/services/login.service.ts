import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject=new Subject<boolean>();

  constructor(private http:HttpClient) { }

  //current-user
  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`);
  }

  //generate token method
  public generateToken(loginData:any){
    return this.http.post(`${baseUrl}/generate-token`,loginData);
  }

  //loginuser: set token in localstorage(i'll implement cookies later)
  public loginUser(token:any){
    localStorage.setItem("token",token);
    // this.loginStatusSubject.next(true);
    return true;
  }

  //isLoggedIn: user is logged in or not
  public isLoggedIn(){
    let tokenStr=localStorage.getItem('token');
    if(tokenStr==undefined||tokenStr==''||tokenStr==null){
      return false;
    }
    else{
      return true;
    }
  }

  //logout
  public logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }

  //get token
  public getToken() {
    const token = localStorage.getItem('token');

    console.log('Token from getToken:', token); // Add this log statement
    return token;
  }

  //set userDetail
  public setUser(user:any){
    localStorage.setItem('user',JSON.stringify(user));
  }

  //getUser
  public getUser(){
    let userStr=localStorage.getItem('user');
    if(userStr!=null){
      return JSON.parse(userStr);
    }
    {
      this.logout();
      return null;
    }
  }

  //get user role
  public getUserRole(){
    let user=this.getUser();
    return user.authorities[0].authority;
  }

}
