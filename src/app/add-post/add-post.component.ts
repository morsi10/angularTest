import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../shared/post.service';

interface Categorie {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  constructor(private fb:FormBuilder, private _postService: PostService, private router:Router) { }
  categories: Categorie[] = [
    {value: 'Sport', viewValue: 'Sport'},
    {value: 'Technologies', viewValue: 'Technologies'},
    {value: 'Économie', viewValue: 'Économie'},
    {value: 'Société', viewValue: 'Société'},
    {value: 'Culture', viewValue: 'Culture'},
  ];
  categorieControl = new FormControl(this.categories[2].value);
  get title(){
    return this.addForm.get('title')
  }
  get description(){
    return this.addForm.get('description')
  }
 
  addForm= this.fb.group({
    title : ['',[Validators.required , Validators.minLength(5)]],
    description : ['',[Validators.required , Validators.minLength(5)]],
    categorie : this.categorieControl,
  })
  ngOnInit(): void {
  }
  onSubmit(post){
   this._postService.AddArticle(post);
   alert("Post est ajouté");
    this.router.navigate(['']);
  }
}
