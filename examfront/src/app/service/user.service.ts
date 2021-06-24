import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import Swal from 'sweetalert2'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { 
    
  }

  //add user
  public addUser(user:any){
      return this.http.post(`${baseUrl}/user/`,user);
  }
}

