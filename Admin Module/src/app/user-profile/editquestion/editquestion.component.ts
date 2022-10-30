import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { QuestionService } from '../../shared/question.service';
import { Question} from '../../shared/question1.model';
import { SubjectService } from '../../shared/subjectService';
import { Subject } from '../../shared/subjectModel';
import { AlertService } from '../../shared/alertService';

@Component({
  selector: 'app-editquestion',
  templateUrl: './editquestion.component.html',
  styleUrls: ['./editquestion.component.css']
})
export class EditquestionComponent implements OnInit {
  public id='';
  public selectedquestion= new Question();
  public subjects=[];
  constructor(private route:ActivatedRoute,
    private router:Router,private subjectService:SubjectService,private qservice:QuestionService,
    private alertService:AlertService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getquestion(this.id);
    this.getSubjects();
    
  }
  getSubjects() {
    this.subjectService.getSubjects().
    subscribe(
      (data: Subject[]) => {
        this.subjects = data
      }, 
      error => console.error('Error', error)
    );
  }
  getquestion(id){
    this.qservice.getqueid(id).subscribe((res) => {
      this.selectedquestion = res as Question;
      console.log(this.selectedquestion);
    }, (err) => {
      console.log(err);
    });

  }


  onEdit(form: NgForm) {
    // console.log(form.value)
    // if (confirm('Are you sure to Update this record ?') === true) {
    //   this.qservice.updatequestion(form.value).subscribe((res) => {
    //     console.log(res);
    //   });
    //   this.router.navigateByUrl('userprofile/Viewq');
    // } else {
    //   this.router.navigate ( [ '/Editq', this.id ] );
    //   this.refresh();
    // }
    this.alertService.showSuccessAlert(() => {
      this.qservice.updatequestion(form.value).subscribe((res) => {
        console.log(res)
      });
      this.router.navigateByUrl('userprofile/Viewq')
    },false)
    }
    refresh() {
      this.id = this.route.snapshot.paramMap.get('id');
      this.getquestion(this.id);
    }

}
