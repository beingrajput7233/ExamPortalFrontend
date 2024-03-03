import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { error } from 'console';
import Swal from 'sweetalert2';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrl: './update-quiz.component.css'
})
export class UpdateQuizComponent implements OnInit{

  categories: any = [];
  constructor(private route:ActivatedRoute,private quizService:QuizService,private categoryService:CategoryService
    ,private router:Router){}
  
  //getting the qId from url
  qId=0;
  quizData:any={};
  ngOnInit(): void {

    //getting quiz
    this.qId=this.route.snapshot.params['qId'];
    // alert(this.qId);
    this.quizService.getQuiz(this.qId).subscribe(
      (data:any)=>{
        this.quizData=data;
        console.log(this.quizData);
      },
      (error)=>{
        Swal.fire('Error',"Error in getting quiz",'error');
      }
    )

      //getting category
    this.categoryService.categories().subscribe(
      (data: any) => {
        this.categories = data;
        console.log(this.categories);
        console.log(data);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error!!', 'Error in loading data from server', 'error');
      }
    );
  }

  public updateQuiz() {
    if (this.quizData.title.trim() == '' || this.quizData.title == null) {
      alert('Title is required!');
      return;
    }

    // other validation can be added.....
    this.quizService.updateQuiz(this.quizData).subscribe(
      (data: any) => {
        this.quizData = {
          title: '',
          description: '',
          maxMarks: '',
          numberOfQuestions: '',
          active: true,
          category: null,
        };
        console.log(data);
        Swal.fire('Success', 'Updated quiz successfully!', 'success').then((e)=>{
          this.router.navigate(['/admin/quizzes']);
        });

      },
      (error) => {
        Swal.fire('Error!!','Error while updating quiz','error');
        console.log(error);
      }
    );
  }

}
