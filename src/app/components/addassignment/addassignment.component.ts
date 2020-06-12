import { Component, OnInit } from '@angular/core';
import { ViewService } from 'src/app/view.service';
import { CourseService } from 'src/app/course.service';

@Component({
  selector: 'app-addassignment',
  templateUrl: './addassignment.component.html',
  styleUrls: ['./addassignment.component.css']
})
export class AddassignmentComponent implements OnInit {

  assignment = {question:null,asstype:'',weight:'',cid:''}
  constructor(private viewService: ViewService, private courseService: CourseService) { }
  courses:any;
  ngOnInit(): void {
    this.courseService.getCourses().subscribe(data=> {
      this.courses = data;
    })
  }

  addassignment(event:Event) {
    event.preventDefault();
    const uploadData = new FormData();
    uploadData.append('imageFile', this.assignment.question, this.assignment.question.name);
    uploadData.append('assType', this.assignment.asstype);
    uploadData.append('weight', this.assignment.weight);
    uploadData.append('cid', this.assignment.cid);
    this.viewService.addAssignment(uploadData).subscribe(data => {
      alert("Assignment added successfully.");
      location.reload();
    });
  }

  goBack() {
    location.href="/assessment";
  }

  handleFileInput(files: FileList) {
    this.assignment.question = files.item(0);
  }
}