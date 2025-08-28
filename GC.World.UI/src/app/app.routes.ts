import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { AdvancedReportingComponent } from './components/league-insights/advanced-reporting/advanced-reporting.component';
import { LoginComponent } from './components/login/login.component';
import { TestComponent } from './components/test/test.component';
import { UserComponent } from './components/user/user.component';


export const routes: Routes = [
   
    {path:'', redirectTo:'/users',pathMatch:'full'},
    {path:'', component: LoginComponent},
    {path:'advance-reporting',component: AdvancedReportingComponent},
    {path:'test',component: TestComponent},
    {path: 'users', component: UserComponent}
];
