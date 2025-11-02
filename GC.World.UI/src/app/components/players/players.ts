import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { PanthersTableComponent } from '../core-components/panthers-table/panthers-table.component';
import { playerColumns } from '../../shared/table-columns-config';
import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [PanthersTableComponent],
  providers: [CurrencyPipe, DatePipe,DecimalPipe], // Add CurrencyPipe to providers
  templateUrl: './players.html',
  styleUrl: './players.css',
})
export class Players {
  constructor(
    private userService: UserService,
    private currencyPipe: CurrencyPipe // Inject if needed in component class
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
  addPlayer() {
    const newPlayer = {
      id: this.playerData.length + 1,
      name: 'New Player',
      position: 'Position',
      team: 'Team',
      age: 0,
      salary: 0,
    };
    this.playerData = [...this.playerData, newPlayer];
  }
}