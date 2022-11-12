import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Result } from "../shared/result.model";

@Injectable({
  providedIn: "root",
})
export class ResultService {
  insertAnswer: Result;
  constructor(private http: HttpClient) {}
  readonly baseURL = " http://localhost:3000/result";

  saveSubmissionData(result: Result) {
    return this.http.post(this.baseURL, result);
  }

  getResult(email: string) {
    return this.http.get(this.baseURL + `/${email}`);
  }

  getResultDetails() {
    return this.http.get(this.baseURL);
  }
}
