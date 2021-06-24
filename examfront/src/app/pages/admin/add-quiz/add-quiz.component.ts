import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryServiceService } from 'src/app/service/category-service.service';
import { QuizServiceService } from 'src/app/service/quiz-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categories=[];

  quizData = {
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active: true,
    category:{
      id:'',
    },
  };

  constructor(private cat:CategoryServiceService, private snack:MatSnackBar, private _quiz:QuizServiceService) { }

  ngOnInit(): void {

      this.cat.categories().subscribe(
        (data:any) => {
          this.categories=data;
          console.log(this.categories);
        },
        (error)=>{
          console.log(error);
          Swal.fire('Error !!','Error in loading data','error');
        }
      );
    
    }

    addQuiz(){
        
      //call server
      this._quiz.addQuiz(this.quizData).subscribe(
        (data:any)=>{
          Swal.fire('Success','Quiz is Added','success');
        },
        (error)=>{
          console.log(error);
          Swal.fire('Error','Error in adding quiz','error');
        }
      )
    };

  }


