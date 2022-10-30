import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Test } from '../shared/testModel';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  constructor(private http: HttpClient) { }
  readonly baseURL = 'http://localhost:3000/test';
  getTests() {
    return this.http.get(this.baseURL) ;
  }
  insertTest( test: Test) {
    return this.http.post(this.baseURL, test);
  }
  getTestByID(_id: string) {
    return this.http.get(this.baseURL + `/${_id}`);
  }
  updateTest(test: Test) {
    return this.http.put(this.baseURL + `/${test._id}`, test);
  }
  deleteTestByID(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }
  

}