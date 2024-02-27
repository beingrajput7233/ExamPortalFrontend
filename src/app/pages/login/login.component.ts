import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private loginService:LoginService,private router:Router){}

  loginData={
    username:'',
    password:'',
  }
  formSubmit(){
    console.log('Login button clicked');

    if(this.loginData.username.trim()==''||this.loginData.username==null)
    {
      alert('Username is required!');
      return;
    }
    if(this.loginData.password.trim()==''||this.loginData.password==null){
      alert("Password is required!");
      return;
    }
    //request to server to generate token
    this.loginService.generateToken(this.loginData).subscribe(
      (data:any)=>{
        //success pr
        console.log(data);
        // console.log(data.jwtToken)
        // alert("success");
        Swal.fire('Success','Logged-in successfully!','success');

        
        this.loginService.loginUser(data.jwtToken);

        this.loginService.getCurrentUser().subscribe(
          (user:any)=>{
            this.loginService.setUser(user);
            console.log(user);

            //redirect to admin
            //redirect to normal
            if(this.loginService.getUserRole()=='Admin'){
              //admin

              //redirect
              // window.location.href='/admin'
              this.router.navigate(['admin'])
            }
            else if(this.loginService.getUserRole()=='Normal'){
              //normal
              // window.location.href='/user-dashboard'
              this.router.navigate(['user-dashboard'])
            }
            else{
              this.loginService.logout();
            }
          }
        );
      },
      (error)=>{
        //error pr
        console.log(error);
        alert("something went wrong");
      }
    )
  }

}
