import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Post } from '../models/post';
import { PostService } from '../shared/post.service';
@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit {

  constructor(private _postService: PostService, private router:Router) { }
  displayedColumns: string[] = ['title', 'description', 'categorie','CreationDate', 'actions'];
  dataSource = new MatTableDataSource(this._postService.getPost()) ;
  ngOnInit(): void {
  }
  addArticle(){
    this.router.navigate(['add-post'])
  }
  editArticle(post){
    this.router.navigate(['posts', post.id]);
    console.log(post);
  }
  deleteArticle(row:Post){
    this._postService.deletePoste(row.id);
    this.dataSource = new MatTableDataSource(this._postService.getPost());
  }
}
