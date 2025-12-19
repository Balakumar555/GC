import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { PanthersTableComponent } from '../core-components/panthers-table/panthers-table.component';
import { playerColumns } from '../../shared/table-columns-config';
import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { Dialog } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { AddPlayersComponent } from './add-players/add-players.component';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [PanthersTableComponent],
  providers: [CurrencyPipe, DatePipe, DecimalPipe], // Add CurrencyPipe to providers
  templateUrl: './players.html',
  styleUrl: './players.css',
})
export class Players {
    
  constructor(
    private userService: UserService,
    private currencyPipe: CurrencyPipe,
    private dialog: MatDialog
  ) {}
  playerData: any[] = [];
  playerListColumns = playerColumns;

  ngOnInit() {
    this.loadPlayers();
  }

  loadPlayers() {
    this.userService.gertPlayers().subscribe(
      (data) => {
        this.playerData = data;
        console.log('Players data loaded:', data);
      },
      (error) => {
        console.error('Error loading players data:', error);
      }
    );
  }
   openAddPlayerPopup() :void {
    const dialogRef = this.dialog.open(AddPlayersComponent, {
      width: '400px',
      height: '250px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
             this.loadPlayers();
      
    });  
  }
  rowAction(event: any) {
 
    console.log('Cell clicked:', event);
  }
}
