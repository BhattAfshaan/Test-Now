import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../../shared/subjectService';
import { Subject } from '../../shared/subjectModel';

@Component({
  selector: 'app-viewsubject',
  templateUrl: './viewsubject.component.html',
  styleUrls: ['./viewsubject.component.css']
})
export class ViewsubjectComponent implements OnInit {

  subjects: Subject[]= []
  constructor(private subjectService:SubjectService) { }

  ngOnInit() {
    this.getCourses()
  }
  getCourses() {
    this.subjectService.getSubjects().
    subscribe(
      (data: Subject[]) => {
        this.subjects = data
      }, 
      error => console.error('Error', error)
    );
  }

  deleteSubject(id: string) {
    this.subjectService.deleteSubjectByID(id).
    subscribe(
      (response) => {
      console.log(response)
      }, 
      error => console.error('Error', error)
    );
  }
  
}
