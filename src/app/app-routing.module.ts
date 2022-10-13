import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

///Adding the new pages

import { PlayersComponent } from './pages/players/players.component'; 
import { TeamsComponent } from './pages/teams/teams.component'; 

///Adding the error pages

import { Error404Component } from './pages/error404/error404.component';
import { Error403Component } from './pages/error403/error403.component';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

/// Importing routes and router module

import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'admin', component: Error403Component},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'Players', component: PlayersComponent },
  { path: 'Teams', component: TeamsComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
