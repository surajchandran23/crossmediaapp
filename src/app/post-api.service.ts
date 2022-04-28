import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { RequestModel } from './RequestModel';
import { ILoginUrl } from './Models/ILoginUrl';

@Injectable({
  providedIn: 'root'
})
export class PostApiService {
apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  postImage(req:any):Observable<any>{
    return this.http.post(this.apiUrl+'postImage/',req)  
  }
  uploadImage(formData:FormData,code:any):Observable<any>{
    return this.http.post(this.apiUrl+'postImage/'+code+'/',formData)
  }
  uploadVideo(formData:FormData,code:any):Observable<any>{
    return this.http.post(this.apiUrl+'postVideo/'+code+'/',formData)
  }

  UploadFile(req:any, file: FormData): Observable<any> {

    return this.http.post(this.apiUrl + req.RequestUrl, file);
  }

  getLoginUrl(){
    return this.http.get<ILoginUrl>(this.apiUrl + 'getLoginUrl/')
  }

}
