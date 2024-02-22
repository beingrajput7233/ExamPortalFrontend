import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private userService:UserService){}
    //form submit ki logic

    public user={
      username:'',
      password:'',
      firstName:'',
      lastName:'',
      email:'',
      phone:'',
    };
  // form submit wala function
  formSubmit(){
    console.log(this.user);
    // can add validations etc.
    if(this.user.username==''||this.user.username==null){
      alert('Username is required!');
      return;
    }

    //add user wala function
    this.userService.addUser(this.user).subscribe(
      (data)=>{
        //success pr
        console.log(data);
        // alert("success");
        Swal.fire('Success','User is registered successfully!','success');
      },
      (error)=>{
        //error pr
        console.log(error);
        alert("something went wrong");
      }
    )
  }

  
}
