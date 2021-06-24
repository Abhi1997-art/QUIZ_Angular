import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }


  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`);
  }

  //Generate Token
  public generateToken(loginData: any){
    return this.http.post(`${baseUrl}/generate-token`,loginData);
  }

  //Set Token in local Storage
  public loginUser(token){
    localStorage.setItem('token',token);
    return true;
  }

  //User is login or not
  public isLoggedIn(){
      let tokenStr=localStorage.getItem('token');
      if(tokenStr==undefined || tokenStr == '' || tokenStr == null){
        return false; 
      }else{
        return true;
      }
  }

  //Logout: Remove token form localStorage
  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  //Get token
  public getToken(){
    return localStorage.getItem('token');
  }

  //Set user details
  public setUser(user){
    localStorage.setItem('user',JSON.stringify(user));
  }

  //Get user details
  public getUser(){
    let userStr = localStorage.getItem('user');
    if(userStr != null){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }

  //Get user Role
  public getUserRole(){
    let user=this.getUser();
    return user.authorities[0].authority;
  }


}
