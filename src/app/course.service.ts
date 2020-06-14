import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private baseUrl = 'https://ms-au-backend.herokuapp.com/course/'; 

  constructor(private http:HttpClient) { }

  getCourseById(course: object): Observable<object> {
    return this.http.post(this.baseUrl+"/getcoursebyid", course);
  }

  getCoursesByLocation(location:string): Observable<object> {
    return this.http.post(this.baseUrl+"getcoursebylocation",location);
  } 

  getCourses(): Observable<object> {
    return this.http.get(this.baseUrl+"getcourses");
  }
  
  addCourse(course: object): Observable<object> {
    return this.http.post(this.baseUrl+"/addcourse", course);
  }

  updateCourse(course: object): Observable<object> {
    return this.http.post(this.baseUrl+"/updatecourse", course);
  }

  deleteCourse(course: object): Observable<object> {
    return this.http.post(this.baseUrl+"/deletecourse", course);
  }

  ratingTrend(): Observable<object> {
    return this.http.get(this.baseUrl+"/ratingtrend")
  }

  updateRating(course:object):Observable<object> {
    return this.http.post(this.baseUrl+"updateRating",course)
  }

  checkLocation(course:object) {
    return this.http.post(this.baseUrl+"checklocation", course);
  }

  getCourseByName(name) {
    return this.http.post(this.baseUrl+"getcoursebyname",name);
  }
}
