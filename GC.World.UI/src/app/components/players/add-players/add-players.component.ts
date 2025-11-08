import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Add this import
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-add-players',
  imports: [CommonModule, FormsModule], // Add FormsModule here
  templateUrl: './add-players.component.html',
  styleUrl: './add-players.component.css',
})
export class AddPlayersComponent {
  name: string = '';
  jsyNumber: number | null = null;
  constructor(private dialog: MatDialog,
    private userService: UserService
  ) {}

  savePlayers(playerForm: any) {
    if (playerForm.valid) {
      const playerData = playerForm.value;
      console.log('Player Data:', playerData);
      this.userService.savePlayers(playerData).subscribe(
        (response) => {
          console.log('Player saved successfully:', response);
          this.closeDialog();
        },
        (error) => {
          console.error('Error saving player:', error);
        }
      );
      // Add your save logic here
    } else {
      console.log('Form is invalid');
    }
  }
  closeDialog() {
   this.dialog.closeAll();
  }
}
