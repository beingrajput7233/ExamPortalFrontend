import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient) { }

  public quizzes(){
    return this.http.get(`${baseUrl}/quiz/`);
  }

  public addQuiz(quizData:any){
    return this.http.post(`${baseUrl}/quiz/`,quizData);
  }

  public deleteQuiz(qId:any){
    return this.http.delete(`${baseUrl}/quiz/${qId}`);
  }

  //getting single quiz
  public getQuiz(qId:any){
    return this.http.get(`${baseUrl}/quiz/${qId}`);
  }

  public updateQuiz(quizData:any){
    return this.http.put(`${baseUrl}/quiz/`,quizData);
  }
}
