import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { userListColumns } from '../../shared/table-columns-config';
import { PanthersTableComponent } from "../core-components/panthers-table/panthers-table.component";
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [PanthersTableComponent, CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  userData: any[]=[];
  userListColumns= userListColumns;

  constructor(private userService: UserService) {}
  ngOnInit() {
    this.getUsers();
  }
  
  getUsers(){
    debugger;
    this.userService.getUsers().subscribe({
      next: (data) =>{
        this.userData = data;
        console.log(this.userData);
      },
      error: (error) =>{
        console.error('error fetching user data', error);
      }
    })
  }
}
