import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Department } from '../shared/departmentModel';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  constructor(private http: HttpClient) { }
  readonly baseURL = 'http://localhost:3000/department';
  getDepartments() {
    return this.http.get(this.baseURL) ;
  }
  insertDepartment( department: Department) {
    return this.http.post(this.baseURL, department);
  }
  getDepartmentByID(_id: string) {
    return this.http.get(this.baseURL + `/${_id}`);
  }
  updateDepartment(department: Department) {
    return this.http.put(this.baseURL + `/${department._id}`, department);
  }
  deleteDepartmentByID(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }
  

}
