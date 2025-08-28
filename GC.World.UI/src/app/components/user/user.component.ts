import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  userData: any[]=[];

  constructor(private userService: UserService) {}
  ngOnInit() {
    this.getUsers();
  }
  
  getUsers(){
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
