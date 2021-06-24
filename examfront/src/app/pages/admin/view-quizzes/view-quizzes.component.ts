import { Component, OnInit } from '@angular/core';
import { QuizServiceService } from 'src/app/service/quiz-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes=[]

  constructor(private quiz:QuizServiceService) { }

  ngOnInit(): void {

    this.quiz.quizzes().subscribe(
        (data:any)=>{
          this.quizzes=data;
          console.log(this.quizzes);
        },
        (error)=>{
          console.log(error);
          Swal.fire('Error !','Error in loading data !','error');
        }
    )
  }

}
