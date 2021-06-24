import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService:UserService, private _snackBar: MatSnackBar) { }
 
  ngOnInit(): void {
  }

  public user={
    username:'',
    password:'',
    firstname:'',
    lastname:'',
    email:'',
    phone:'',
  };

  formSubmit(){
    console.log(this.user);
    if(this.user.username == '' || this.user.username == null){
      this._snackBar.open('Username Required',' ',{
        duration:3000,
        verticalPosition:'top',
        horizontalPosition:'right'
      });
      return;
    }



  //addUser: userService
this.userService.addUser(this.user).subscribe(
  (data:any)=>{
    console.log(data);
    
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Successfully Registered',
      showConfirmButton: false,
      timer: 2000
    })
    //Swal.fire('Successfully Registered','Username is ' + data.username, 'success');
  },
  (error)=>{
    console.log(error);
    this._snackBar.open('Something went wrong !!',' ',{
      duration:3000,
      verticalPosition:'top',
      horizontalPosition:'right'
    });
  }
)
  }

}
