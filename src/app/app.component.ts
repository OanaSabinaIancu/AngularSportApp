import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Component } from '@angular/core';
import { stringify } from 'querystring';
import { NgForm } from '@angular/forms'; 
import { AuthenticationService } from './services/authentication.service';
import{ Auth } from '@angular/fire/auth'
import { from } from 'rxjs';
import { Router } from '@angular/router';
//import {RequestOptions} from '@angular/common/http';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYez_CUG1hZEiovPKtvRE_GSiE1TlPqlY",
  authDomain: "sportlovers-e67e9.firebaseapp.com",
  projectId: "sportlovers-e67e9",
  storageBucket: "sportlovers-e67e9.appspot.com",
  messagingSenderId: "598729972960",
  appId: "1:598729972960:web:18e2d7c2538b0e8e154485",
  measurementId: "G-D3FYBQTN84"
};


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  [x: string]: any;

  opened = false;

  constructor(private http: HttpClient, public authService: AuthenticationService, private router:Router){
   //this.loadPosts();
  }

  posts: any[] = [];

  loadPosts(){
    this.http.get('https://recrutare.compexin.ro/api/web/jucatorioana', {}).subscribe((posts: any) => {
      //alert(JSON.stringify(response));

      this.posts = posts;
    });
  }

  logout(){
    return this.authService.logout().subscribe( () => {
      this.router.navigate(['']);
    });
  }


  createPosts(form: {"PRENUME": string, "NUME": string, "DATA_NASTERE": string, "ID_ECHIPA": string}){
    console.log(form)
    console.log({ "NUME": "Hagi", "PRENUME": "Gheorghe", "DATA_NASTERE": "1979-01-01" , "ID_ECHIPA": "1"})
    console.log(JSON.stringify(form))
    this.http.post('https://recrutare.compexin.ro/api/web/jucatorioana', form).subscribe((response) => {
      console.log(response)
      alert(JSON.stringify(response));
    }, (error)=>{
      console.log(error)
      alert(JSON.stringify(error));
    });
  }

  
}
