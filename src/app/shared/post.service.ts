import { Injectable } from '@angular/core';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor() { }
  AddArticle(post) {
    post.CreationDate = new Date().toLocaleDateString();
    post.id = this.getLatestId();
    const postArr: Post[] = JSON.parse(localStorage.getItem('postList'));
    if (postArr !== null) {
      postArr.push(post);
      localStorage.setItem('postList', JSON.stringify(postArr));
    }else {
      const newPostArray: Post[] = [];
      newPostArray.push(post);
      localStorage.setItem('postList', JSON.stringify(newPostArray));
    }
  }
  getPost(){
    const postList: Post[] = JSON.parse(localStorage.getItem('postList'));
    return postList;
  }
  getLatestId(){
    let lastId:string = localStorage.getItem('LastPostId');
    if(lastId == null){
      localStorage.setItem('LastPostId', "1");
      return 1;
    }else {
      lastId = (Number(lastId) + 1).toString();
      localStorage.setItem('LastPostId',lastId);
      return Number(lastId);
    }
  }
  deletePoste(id){
    const postList: Post[] = JSON.parse(localStorage.getItem('postList'));
    const index = postList.findIndex((object)=>{
      return object.id === id; 
    })
    console.log(index);
    if(index !== -1){
      postList.splice(index,1);
      localStorage.setItem('postList', JSON.stringify(postList));
    }
  }
  getPostById(id){
    const PostList: Post[] = JSON.parse(localStorage.getItem('postList'));
    if (PostList !== null) {
      const post = PostList.filter(data => {
        return data.id === id
      });
      return post;
    }
    else return [];
  }
  editPost(post){
    
    const postList: Post[] = JSON.parse(localStorage.getItem('postList'));
    const index = postList.findIndex((object)=>{
      return object.id === post.id; 
  })
 
  postList[index] = post;
    localStorage.setItem('postList', JSON.stringify(postList));
    
  }
}
