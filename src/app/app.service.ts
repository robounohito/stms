import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Entity } from './app.reducer';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private http: HttpClient
  ) { }

  getEmployees() {
    return this.http.get<{ data: Entity[] }>(`http://dummy.restapiexample.com/api/v1/employees`);
  }

  getPosts() {
    return this.http.get<Entity[]>(`https://jsonplaceholder.typicode.com/posts`);
  }

}
