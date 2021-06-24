import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/service/question.service';
import { QuizServiceService } from 'src/app/service/quiz-service.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  public Editor = ClassicEditor;

  qId;
  qTitle;
  question={
    quiz:{
      id:''
    },
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
  };

  constructor(private route:ActivatedRoute, private ques:QuestionService) { }

  ngOnInit(): void {
    this.qId= this.route.snapshot.params.id;
    this.qTitle= this.route.snapshot.params.title;
    console.log(this.qId);
    console.log(this.qTitle);
    
    this.question.quiz.id = this.qId;
  }

  formSubmit(){
    this.ques.addQuestion(this.question).subscribe(
      (data:any)=>{
          Swal.fire('Success','Question Added Successfully','success');
          this.question.content='';
          this.question.option1='';
          this.question.option2='';
          this.question.option3='';
          this.question.option4='';
          this.question.answer='';
      },
      (error)=>{
        Swal.fire('Error','Something Went Wrong !!','error');
      }
    )
  }

}
