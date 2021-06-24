import { Component, OnInit } from '@angular/core';
import { CategoryServiceService } from 'src/app/service/category-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {

  categories;

  constructor(private cat:CategoryServiceService) { }

  ngOnInit(): void {

    this.cat.categories().subscribe(
      (data:any)=>{
        this.categories=data;

      },
      (error)=>{
        Swal.fire('Error','Error in loading !!','error');
      }
    )
  }

}
