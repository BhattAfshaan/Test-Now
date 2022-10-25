import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject } from '../shared/subjectModel';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  constructor(private http: HttpClient) { }
  readonly baseURL = 'http://localhost:3000/subject';
  getSubjects() {
    return this.http.get(this.baseURL) ;
  }
  insertSubject( subject: Subject) {
    return this.http.post(this.baseURL, subject);
  }
  getSubjectByID(_id: string) {
    return this.http.get(this.baseURL + `/${_id}`);
  }
  updateSubject(subject: Subject) {
    return this.http.put(this.baseURL + `/${subject._id}`, subject);
  }
  deleteSubjectByID(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }
  

}
