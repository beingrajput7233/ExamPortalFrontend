import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import { error } from 'console';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrl: './view-quizzes.component.css'
})
export class ViewQuizzesComponent implements OnInit{

  constructor(private quizService:QuizService){}
  
  quizzes:any=[]

    ngOnInit(): void {
      this.quizService.quizzes().subscribe(
        (data:any)=>{
          this.quizzes=data;
          console.log(this.quizzes);
          console.log(data);
        },
        error=>{
          console.log(error);
          Swal.fire("Error!!","Error in loading data",'error');
        }
      )
    }

  
}
