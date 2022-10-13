import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PlayersComponent } from '../pages/players/players.component';

import { Input } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  @Input() postList = [];


  constructor(private formBuilder: FormBuilder, private http: HttpClient, private dialogRef : MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public editData:any) { }

  playerForm !: FormGroup;

  action : String = "Adaugă";
  act:String="Adăugare";

  data:any = PlayersComponent.posts;

  posts: any[] = [];

  ngOnInit(): void {
    this.playerForm = this.formBuilder.group({
      PRENUME: ['', Validators.required],
      NUME: ['', Validators.required],
      DATA_NASTERE: ['', Validators.required],
      ID_ECHIPA: ['', Validators.required],
    })
    
    if(this.editData){
      this.action="Editează";
      this.act="Editare";
      this.playerForm.controls['PRENUME'].setValue(this.editData.PRENUME);
      this.playerForm.controls['NUME'].setValue(this.editData.NUME);
      this.playerForm.controls['DATA_NASTERE'].setValue(this.editData.DATA_NASTERE);
      this.playerForm.controls['ID_ECHIPA'].setValue(this.editData.ID_ECHIPA);
    }
  }



  createPosts(form: {"PRENUME": string, "NUME": string, "DATA_NASTERE": string, "ID_ECHIPA": string}){
    if(this.editData.ID_JUCATOR == "undefined"){
      if(this.playerForm.valid){
        console.log(form)
        console.log({ "NUME": "Hagi", "PRENUME": "Gheorghe", "DATA_NASTERE": "1979-01-01" , "ID_ECHIPA": "1"})
        console.log(JSON.stringify(form))
        this.http.post('https://recrutare.compexin.ro/api/web/jucatorioana', form).subscribe((response: any) => {
            console.log(response)
            alert(JSON.stringify(response));
            this.playerForm.reset();
            this.dialogRef.close('save');
          }, (error: any)=>{
            console.log(error)
            alert(JSON.stringify(error));
          });
        }
      else{
        alert("Eroare la adăugarea datelor")
      }
    }
    else{
      this.updateData();
    }
  }

  updateData(){
    this.playerForm.value["ID_JUCATOR"] = this.editData.ID_JUCATOR
    console.log(this.playerForm.value, "bai", this.editData.ID_JUCATOR)
    this.putData(this.playerForm.value)
    .subscribe({
      next: (response:any) => {
        alert("Date actualizate cu succes");
        this.playerForm.reset();
        this.dialogRef.close('update');
      },
      error: ()=> {
        alert("Eroare la editare");
        console.log("CEVA ",this.editData)
      }
    })
  }

  putData(data:any){
    return this.http.put<any>('https://recrutare.compexin.ro/api/web/jucatorioana', data)
  }
  
}
