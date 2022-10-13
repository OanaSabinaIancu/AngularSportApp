import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import {MatSort, Sort} from '@angular/material/sort';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

import { Input, Output } from '@angular/core';


@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css'],
  
})
export class PlayersComponent  {
  

  displayedColumns: string[] = ['ID_JUCATOR', 'PRENUME', 'NUME', 'DATA_NASTERE', 'ID_ECHIPA', 'EDITEAZA'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  opened = false;
  _liveAnnouncer: any;
  playerForm: any;
  editData: any;

  data :any;



  user$ = this.authService.currentUser$;
  posts: any;
  static posts: any;
   

  constructor(private http: HttpClient,  private dialogRef : MatDialogRef<DialogComponent>, private dialog : MatDialog, public authService: AuthenticationService, private router:Router){
   //this.loadPosts();
  }


  logout(){
    return this.authService.logout().subscribe( () => {
      this.router.navigate(['']);
    });
  }

    loadPosts(){
      this.http.get('https://recrutare.compexin.ro/api/web/jucatorioana/active', {}).subscribe({
        next: (response:any) => {
        //alert(JSON.stringify(response));

        this.posts = response.DATA;
        console.log("aici e posts",this.posts)
        this.dataSource = new MatTableDataSource(response.DATA);
        
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
          return this.posts;
      }
    })
  }

  postRestore(form: { "ID_JUCATOR": string}){
    this.http.post('https://recrutare.compexin.ro/api/web/jucatorioana/restore', form).subscribe((response) => {
      console.log(response)
      alert(JSON.stringify(response));
    }, (error)=>{
      console.log(error)
      alert(JSON.stringify(error));
    });
  }
  

  edit(row : any){
    this.dialog.open(DialogComponent, {
      width: '30%',
      data:row,
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

    /** Announce the change in sort state for assistive technology. */
    announceSortChange(sortState: Sort) {
      // This example uses English messages. If your application supports
      // multiple language, you would internationalize these strings.
      // Furthermore, you can customize the message to add additional
      // details about the values being sorted.
      if (sortState.direction) {
        this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      } else {
        this._liveAnnouncer.announce('Sorting cleared');
      }
    }

    openDialog() {
      this.dialog.open(DialogComponent, {
        width: '30%',

    });
  }

  deleteData(id:string){
    console.log("IONELE!!!!!!!!!!!! ", id)
    let tmp = { "ID_JUCATOR" : id};

    this.delete_data(tmp)
    .subscribe({
      next: (response:any) => {
        alert("Date actualizate cu succes");
      },
      error: ()=> {
        alert("Eroare la stergere");
        console.log("COstel ")
      }
    })
  }

  delete_data(id: { "ID_JUCATOR" : string}) {
    console.log(id)
    return this.http.delete('https://recrutare.compexin.ro/api/web/jucatorioana', { body: id});
  }

  ngOnInit() {
    this.loadPosts(); // Now has value;   
  }
}
