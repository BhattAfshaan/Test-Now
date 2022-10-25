import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Course } from '../shared/courseModel';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(private http: HttpClient) { }
  readonly baseURL = 'http://localhost:3000/courses';
  getCourses() {
    return this.http.get(this.baseURL) ;
  }
  insertCourse( course: Course) {
    return this.http.post(this.baseURL, course);
  }
  getCourseByID(_id: string) {
    return this.http.get(this.baseURL + `/${_id}`);
  }
  updateCourse(course: Course) {
    return this.http.put(this.baseURL + `/${course._id}`, course);
  }
  deleteCourseByID(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }
  

}
