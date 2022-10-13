import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-dialog-teams',
  templateUrl: './dialog-teams.component.html',
  styleUrls: ['./dialog-teams.component.css']
})
export class DialogTeamsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private dialogRef : MatDialogRef<DialogComponent>, private http: HttpClient, @Inject(MAT_DIALOG_DATA) public editData:any) { }

  teamForm !: FormGroup;


  posts: any[] = [];
  action : String = "Adaugă";
  act:String="Adăugare";

  ngOnInit(): void {
    this.teamForm = this.formBuilder.group({
      
      DENUMIRE: ['', Validators.required],
    })

    if(this.editData){
      this.action="Editează";
      this.act="Editare";
      this.teamForm.controls['DENUMIRE'].setValue(this.editData.DENUMIRE);
    }
  }

  loadPosts(){
    this.http.get('https://recrutare.compexin.ro/api/web/echipeoana', {}).subscribe((posts: any) => {
      //alert(JSON.stringify(response));

      this.posts = posts;
    });
  }

  putDataTeam(data:any){
    return this.http.put<any>('https://recrutare.compexin.ro/api/web/echipeoana', data)
  }

  updateDataTeam(){
    this.teamForm.value["ID_ECHIPA"] = this.editData.ID_ECHIPA
    console.log(this.teamForm.value, "bai", this.editData.ID_ECHIPA)
    this.putDataTeam(this.teamForm.value)
    .subscribe({
      next: (response:any) => {
        alert("Date actualizate cu succes");
        this.teamForm.reset();
        this.dialogRef.close('update');
      },
      error: ()=> {
        alert("Eroare la editare");
        console.log("CEVA ",this.editData)
      }
    })
  }


  createPosts(form: {"PRENUME": string, "NUME": string, "DATA_NASTERE": string, "ID_ECHIPA": string}){
    if(this.editData.ID_JUCATOR == "undefined"){
      if(this.teamForm.valid){
        console.log(form)
        console.log({ "NUME": "Hagi", "PRENUME": "Gheorghe", "DATA_NASTERE": "1979-01-01" , "ID_ECHIPA": "1"})
        console.log(JSON.stringify(form))
        this.http.post('https://recrutare.compexin.ro/api/web/jucatorioana', form).subscribe((response: any) => {
            console.log(response)
            alert(JSON.stringify(response));
            this.teamForm.reset();
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
      this.updateDataTeam();
    }
  }
}
