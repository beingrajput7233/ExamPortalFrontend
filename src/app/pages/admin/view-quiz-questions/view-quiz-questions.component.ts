import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrl: './view-quiz-questions.component.css'
})
export class ViewQuizQuestionsComponent implements OnInit{
  
  qId:any;
  qTitle:any;
  questions:any=[];

  constructor(private route:ActivatedRoute
    ,private questionService:QuestionService){}
  
  
  ngOnInit(): void {
    this.qId=this.route.snapshot.params['qId'];
    this.qTitle=this.route.snapshot.params['title'];

    console.log(this.qId);
    console.log(this.qTitle);

    this.questionService.getQuestionsOfQuiz(this.qId).subscribe(
      (data:any)=>{
        this.questions=data;
        console.log(this.questions);
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error","Error in fetching questions",'error');
      }
    )
  }

}
