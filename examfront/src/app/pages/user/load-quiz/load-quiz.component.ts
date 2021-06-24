import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizServiceService } from 'src/app/service/quiz-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  constructor(private route:ActivatedRoute, private quiz:QuizServiceService) { }
  catId;
  quizzes;
  ngOnInit(): void {
    this.catId=this.route.snapshot.params.catId;

    if(this.catId == 0){
        this.quiz.quizzes().subscribe(
          (data:any)=>{
            this.quizzes=data;
          },
          (error)=>
            {
              Swal.fire('Error','Error in loading all quizzes!!','error');
            }
        )
    }
    else{

    }
  }

}
