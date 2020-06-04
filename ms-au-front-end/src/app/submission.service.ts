import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {

  baseUrl = 'http://localhost:8080/submission/';
  constructor(private http:HttpClient) { }

  getSubmissionById(submissionId): Observable<object> {
    return this.http.post(this.baseUrl+"getsubmissionbyid", submissionId);
  }

  dropSubmission(submissionId): Observable<object> {
    return this.http.post(this.baseUrl+"dropsubmissionbyid", submissionId);
  }

  upload(submission): Observable<object>  {
    return this.http.post(this.baseUrl+"upload", submission, { observe: 'response' });
  }

  getSumOfWeights(submissionId): Observable<object> {
    return this.http.post(this.baseUrl+"getscore", submissionId, { observe: 'response' });
  }
}
