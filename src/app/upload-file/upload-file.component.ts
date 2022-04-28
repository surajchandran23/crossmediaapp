import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { PostApiService } from '../post-api.service';
import { RequestModel } from '../RequestModel';
import {takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  selectedFiles: Array<File> = new Array<File>();
  selectedFile: File = null;
  public socialMedia = []
  editStatus: boolean;
  postapi : PostApiService;
  req: RequestModel;
  FB: any;
  file:File;
  fbCode:string="";
  private _unsubscribeAll : Subject<any>;
  @ViewChild('caption',{static:false}) caption:ElementRef;
  @ViewChild('login',{static:false}) login:ElementRef;
  validationCheck:boolean= false
  successMessage:string =''
  
  constructor(private http:PostApiService,private activatedRoute:ActivatedRoute) {
     this._unsubscribeAll = new Subject();
     this.activatedRoute.queryParams.subscribe(data=>{
       console.log(data);
       this.fbCode=data.code
     })
   }

  ngOnInit(): void { 
   console.log('successMessage',this.successMessage)
  }

  getDetails(event){
    console.log('eve',event);
    console.log('eve1',this.login);
  }

  

  uploadFile(){
    const selectFile = new FormData()

    for (var i = 0; i < this.selectedFiles.length; i++) {
      
      selectFile.append('content', this.selectedFiles[i]);
    
    }

  }

  postImage(){
    this.http.postImage(this.caption.nativeElement.value).pipe(takeUntil(this._unsubscribeAll)).subscribe((result)=>{

    });
  }
  uploadImage(){

    if(this.fbCode != undefined){
      this.validationCheck = false;
      console.log('code',this.fbCode);
      const formData:FormData = new FormData();
      formData.append('uploadedFile',this.file,this.file.name);
      this.http.uploadImage(formData,this.fbCode).pipe(takeUntil(this._unsubscribeAll)).subscribe((result)=>{
        console.log('suraj',result);
        if(result.status == "200" ){
          this.successMessage=result.message
        }
      })

    }
    else{
      this.validationCheck = true;
    }

  }
  uploadVideo(){

    if(this.fbCode != undefined){
      this.validationCheck = false;
      console.log('code',this.fbCode);
      const formData:FormData = new FormData();
      console.log('code',this.fbCode);
      this.http.uploadVideo(formData,this.fbCode).pipe(takeUntil(this._unsubscribeAll)).subscribe((result)=>{
        console.log('suraj',result);
        if(result.status == "200" ){
          this.successMessage=result.message
        }
      })

    }
    else{
      this.validationCheck = true;
    }

  }


  passData(){
    this.http.getLoginUrl().pipe(takeUntil(this._unsubscribeAll)).subscribe((result) => { 
      console.log('result', result)
      window.open(result.url)
      // const foo = window.open(result.url,"_self");
      
      // foo.addEventListener('popstate',()=>{
      //   console.log('abc',window.location.href);
      //   const pushUrl = (href) => {
      //     history.pushState({}, '', href);
      //     window.dispatchEvent(new Event('popstate'));
      //   };
      // });

      // foo.addEventListener
      

      
      
      // console.log('url', foo);
      // console.log('foo history', foo.history);
      // const urlParams = new URL(result.url);
      // const code = urlParams.searchParams.get("code");
      // console.log(code);
    },
    (_error) => { 
      console.log(_error);}, () => {console.log('Call executed Instagram'); 
    
    });
  }

  


  onSelectFile(event){
    console.log("suraj event",event);
    this.file=event.target.files[0];
    


  }

}
