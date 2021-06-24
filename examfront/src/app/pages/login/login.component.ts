import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData={
    username:'',
    password:'',
  }

  constructor(private snack:MatSnackBar, private login:LoginService) { }

  ngOnInit(): void {
  }

  formSubmit(){
    console.log("Clicked");

    if(this.loginData.username.trim()=='' || this.loginData.username==null){
      this.snack.open("Username is Required !!",'',{
        duration:3000,
      });
      return;
    }

    if(this.loginData.password.trim()=='' || this.loginData.password==null){
      this.snack.open("Password is Required !!",'',{
        duration:3000,
      });
      return;
    }

    //Request to serve to generate the token
    this.login.generateToken(this.loginData).subscribe((data:any)=>{
        console.log('Success');
        console.log(data);

        //Login..
        this.login.loginUser(data.token);

        this.login.getCurrentUser().subscribe(
          (user:any)=>{
            this.login.setUser(user);
            console.log(user);


            //Redirect
            if(this.login.getUserRole()=='ADMIN'){
                window.location.href='/admin';
            }else if (this.login.getUserRole() == 'NORMAL'){
                window.location.href='/user-dashboard/0';
            }else{
              this.login.logout();
            }
            
          }
        )

    },
    (error) => {
      console.log('Error!');
      console.log(error);
      this.snack.open("Invalid Details !! Please try Again !",'',{
        duration:3000,
      })
    })

  }

}
