import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Post } from '../models/post';
import { PostService } from '../shared/post.service';

interface Categorie {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit {
  id;
  post:Post[];
  
  categories: Categorie[] = [
    {value: 'Sport', viewValue: 'Sport'},
    {value: 'Technologies', viewValue: 'Technologies'},
    {value: 'Économie', viewValue: 'Économie'},
    {value: 'Société', viewValue: 'Société'},
    {value: 'Culture', viewValue: 'Culture'},
  ];
  categorieControl = new FormControl(this.categories[2].value);
  constructor(private route:ActivatedRoute,private fb:FormBuilder, private _postService: PostService, private router:Router) { }

  get title(){
    return this.editForm.get('title')
  }
  get description(){
    return this.editForm.get('description')
  }
 
  editForm= this.fb.group({
    title : ['',[Validators.required , Validators.minLength(5)]],
    description : ['',[Validators.required , Validators.minLength(5)]],
    categorie : this.categorieControl,
  })
 
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap)=>{
      let id = parseInt(params.get('id'));
      this.id = id;
     
    })
    this.post = this._postService.getPostById(this.id),
    this.editForm.patchValue(this.post[0])
  }
  onSubmit(post){
    post.id = this.post[0].id;
    post.CreationDate =this.post[0].CreationDate
    this._postService.editPost(post);
    alert("Post est modifié");
     this.router.navigate(['']);
   }
}

