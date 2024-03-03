import { Component } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {

  constructor(private categoryService:CategoryService,private router:Router){}

  categoryData={
    title:'',
    description:'',
  }
  formSubmit(){
    console.log('Add category button clicked');

    if(this.categoryData.title.trim()==''||this.categoryData.title==null)
    {
      alert('Title is required!');
      return;
    }
    if(this.categoryData.description.trim()==''||this.categoryData.description==null){
      alert("Description is required!");
      return;
    }

    this.categoryService.addCategory(this.categoryData).subscribe(
      (data:any)=>{
        this.categoryData={
          title:'',
          description:'',
        }
        console.log(data);
        Swal.fire('Success','Added category successfully!','success').then((e)=>{
          this.router.navigate(['/admin/categories']);
        });;
      }
      ,
      (error)=>{
        console.log(error);
        alert("something went wrong");
      }
    )
  }
}
