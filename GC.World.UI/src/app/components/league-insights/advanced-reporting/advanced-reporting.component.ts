import { Component } from '@angular/core';
import { PlayerNotesComponent } from './new-advance-report/player-notes/player-notes.component';
import { GamesComponent } from './new-advance-report/games/games.component';
import { OffenceComponent } from './new-advance-report/offence/offence.component';
import { DefenceComponent } from './new-advance-report/defence/defence.component';
import { SpecialTeamsComponent } from './new-advance-report/special-teams/special-teams.component';
import { StFormationsComponent } from './new-advance-report/st-formations/st-formations.component';
import{ NgxSpinnerModule, NgxSpinner} from 'ngx-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-advanced-reporting',
  standalone: true,
  imports: [NgxSpinnerModule, MatTabsModule,CommonModule],
  templateUrl: './advanced-reporting.component.html',
  styleUrl: './advanced-reporting.component.css'
})
export class AdvancedReportingComponent {
selectedTabIndex: number=0;
componentMap=[
  PlayerNotesComponent,
  GamesComponent,
  OffenceComponent,
  DefenceComponent,
  SpecialTeamsComponent,
  StFormationsComponent
]
ngOnInit()
{

}
  onClickTab(Event: any): void{
    this.selectedTabIndex = Event.index;
  }
  get activeComponent(){
    return this.componentMap[this.selectedTabIndex];
  }
  get componentInputs(): Record<string, any>{
    switch(this.selectedTabIndex){
      case 0:
        return{
          
        };
        case 1:
        return{
          
        };
        case 2:
        return{
          
        };
        case 3:
        return{
          
        };
        case 4:
        return{
          
        };
        case 5:
        return{
          
        };
        default:
          return{};
    }
  }
}
