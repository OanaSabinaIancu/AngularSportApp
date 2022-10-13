import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogTeamsComponent } from 'src/app/dialog-teams/dialog-teams.component';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import {  MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import {MatSort, Sort} from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  displayedColumns: string[] = ['ID_ECHIPA', 'DENUMIRE', 'EDITEAZA'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  user$ = this.authService.currentUser$;

  opened = false;
  _liveAnnouncer: any;


  constructor(private dialog : MatDialog, private http: HttpClient,  private dialogRef : MatDialogRef<DialogComponent>, public authService: AuthenticationService) { }

  posts: any[] = [];

    loadPosts(){
      this.http.get('https://recrutare.compexin.ro/api/web/echipeoana', {}).subscribe({
        next: (response:any) => {
        //alert(JSON.stringify(response));

        this.posts = response.DATA;
        
        this.dataSource = new MatTableDataSource(response.DATA);
        console.log(response.DATA.value)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  edit(row : any){
    this.dialog.open(DialogTeamsComponent, {
      width: '30%',
      data:row,
    })
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
    return this.http.delete('https://recrutare.compexin.ro/api/web/echipeoana', { body: id});
  }

  ngOnInit() {
    this.loadPosts(); // Now has value;
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
    this.dialog.open(DialogTeamsComponent, {
      width: '30%',

  });
  
  }
}