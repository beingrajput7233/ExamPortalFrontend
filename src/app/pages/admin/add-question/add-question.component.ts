import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css'
})
export class AddQuestionComponent implements OnInit{
  qId:any;
  qTitle:any;
  question:any={
    quiz:{

    },
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
  }



  constructor(private route:ActivatedRoute,private questionService:QuestionService,private router:Router){}
  ngOnInit(): void {
    this.qId=this.route.snapshot.params['qId'];
    this.qTitle=this.route.snapshot.params['qTitle'];
    // alert(this.route.snapshot.params['qTitle']);
    // alert(this.qTitle);
    this.question.quiz['qId']=this.qId;
  }

  public addQuestion(){

    if(this.question.content.trim()==''||this.question.content==null){
      alert('Please add content!')
      return;
    }
    if(this.question.option1.trim()==''||this.question.option1==null){
      alert('Please add Option 1!')
      return;
    }
    if(this.question.option2.trim()==''||this.question.option2==null){
      alert('Please add Option 2!')
      return;
    }
    if(this.question.answer.trim()==''||this.question.answer==null){
      alert('Please select correct answer!')
      return;
    }


    this.questionService.addQuestion(this.question).subscribe(
      (data:any)=>{
        console.log(data);
        Swal.fire("Success","Question Added Successfully",'success').then((e)=>{
          this.router.navigate(['admin/view-questions/'+this.qId+'/'+this.qTitle]);
        })
      },
      (error)=>{
        Swal.fire('Error!!','Error in adding question','error');
        console.log(error);
      }
    )
  }

}
