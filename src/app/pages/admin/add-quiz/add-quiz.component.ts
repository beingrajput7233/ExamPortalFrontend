import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { error } from 'console';
import Swal from 'sweetalert2';
import { QuizService } from '../../../services/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrl: './add-quiz.component.css',
})
export class AddQuizComponent implements OnInit {
  categories: any = [];

  quizData: any = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: true,
    category: null,
  };

  constructor(
    private categoryService: CategoryService,
    private quizService: QuizService,
    private router:Router,
  ) {}

  ngOnInit(): void {
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

  public addQuiz() {
    if (this.quizData.title.trim() == '' || this.quizData.title == null) {
      alert('Title is required!');
      return;
    }

    // other validation can be added.....
    this.quizService.addQuiz(this.quizData).subscribe(
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
        Swal.fire('Success', 'Added quiz successfully!', 'success').then((e)=>{
          this.router.navigate(['/admin/quizzes']);
        });;
      },
      (error) => {
        Swal.fire('Error!!','Error while adding quiz','error');
        console.log(error);
      }
    );
  }
}
