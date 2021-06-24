import { Component, OnInit } from '@angular/core';
import { CategoryServiceService } from 'src/app/service/category-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit {

  Categories=[]

  constructor(private category:CategoryServiceService) { }

  ngOnInit(): void {

    this.category.categories().subscribe((data:any) => {
      this.Categories=data;
      console.log(this.Categories);
    },
    (error)=>{
      console.log(error);
      Swal.fire("Error !!","Error in loading data",'error');
    }
    );
  }

}
