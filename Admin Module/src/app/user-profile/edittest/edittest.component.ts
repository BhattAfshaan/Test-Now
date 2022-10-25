import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../../shared/testService';
import { CustomDateService } from '../../shared/CustomDateService';
import { Test } from '../../shared/testModel';
import { NgForm } from '@angular/forms';
import { AmazingTimePickerService } from 'amazing-time-picker';

@Component({
  selector: 'app-edittest',
  templateUrl: './edittest.component.html',
  styleUrls: ['./edittest.component.css']
})
export class EdittestComponent implements OnInit {

  public selectedTest= new Test();
  public id = '';
  viewDate : any
  viewStartTime: any
  viewEndTime: any
  time: any;
  time24: any;
  constructor(private route: ActivatedRoute, private atp: AmazingTimePickerService, private router: Router, private testService: TestService,  private customDateService: CustomDateService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getTestById(this.id);
  }
  
  getTestById(id) {
      this.testService.getTestByID(id).subscribe((res) => {
       this.selectedTest = res as Test
       this.getViewDate()
  
      }, (err) => {
        console.log(err);
      });
  }
  
  onEdit(form: NgForm) {
    this.selectedTest.testDate = this.getFormattedDate()
    console.log(this.selectedTest)
    if (confirm('Are you sure to Update this record ?') === true) {
      this.testService.updateTest(this.selectedTest).subscribe((res) => {
        console.log(res);
      });
      this.router.navigateByUrl('userprofile/ViewTest');
    } else {
      this.router.navigate ( [ '/EditTest', this.id ] );
      this.refresh();
    }
    }
    refresh() {
      this.id = this.route.snapshot.paramMap.get('id');
      this.getTestById(this.id);
    }

    getViewDate() {
       this.viewDate = this.customDateService.fromModel(this.selectedTest.testDate) 
       this.selectedTest.testDate = this.viewDate
       this.viewStartTime = this.selectedTest.testStartTime.substring(0,5);
      //handle time binding to view
      
    }

    getFormattedDate(): string {
      return this.customDateService.toModel(this.selectedTest.testDate as any)
    }
  
   //handle time picker//
   open(type:string) {
     const amazingTimePicker = this.atp.open()
      amazingTimePicker.afterClose().subscribe(time => {
      this.time24 = time;
      if(type == 'startTime') {
        this.viewStartTime = time
        this.selectedTest.testStartTime = this.tConvert(time);
      }
      else {
        this.viewEndTime = time
        this.selectedTest.testEndTime = this.tConvert(time);
      }
    })
  }
  
    //convert time into AM/PM format//
    tConvert (time) {
      time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    if (time.length > 1) { // If time format correct
        time = time.slice (1);  // Remove full string match value
        time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
      }
      this.time=time.join('')
      return time.join (''); 
    }

}
