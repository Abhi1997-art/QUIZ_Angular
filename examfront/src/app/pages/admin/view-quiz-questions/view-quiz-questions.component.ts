import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/service/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

qId;
qTitle;
questions=[];

  constructor(private route:ActivatedRoute, private question:QuestionService,private snack:MatSnackBar) { }

  ngOnInit(): void {
    this.qId=this.route.snapshot.params.id;
    this.qTitle=this.route.snapshot.params.title;
    
    this.question.getQuestionsOfQuiz(this.qId).subscribe(
      (data:any)=>{
        this.questions=data;
        console.log(this.questions);
        
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error !!','Error in loading data','error');
      }
    )
  }

  deleteQuestion(qId){
    Swal.fire({
      icon:'info',
      showCancelButton:true,
      confirmButtonText:'Delete',
      title:'Are you sure, you want to delete this question !'
    }).then((result)=>{
      if(result.isConfirmed){
        this.question.deleteQuestion(qId).subscribe(
          (data:any)=>{
            this.snack.open('Question Deleted Successfully','',{
              duration:3000,

            });
            this.questions=this.questions.filter((q) => q.id != qId)
          },
          (error)=>{
            this.snack.open('Error ! Something went wrong !','',{
              duration:3000,

            });
          }
        )
      }
    });
  }

}
