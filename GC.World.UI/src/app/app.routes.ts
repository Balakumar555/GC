import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { AdvancedReportingComponent } from './components/league-insights/advanced-reporting/advanced-reporting.component';
import { LoginComponent } from './components/login/login.component';


export const routes: Routes = [
   
    {path:'', redirectTo:'/advance-reporting',pathMatch:'full'},
    {path:'', component: LoginComponent},
    {path:'advance-reporting',component: AdvancedReportingComponent}
];
