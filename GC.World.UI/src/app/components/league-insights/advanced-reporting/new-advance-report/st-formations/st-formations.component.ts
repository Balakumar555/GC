import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import {MatDialog} from '@angular/material/dialog'
import { AddFormationComponent } from './add-formation/add-formation.component';

@Component({
  selector: 'app-st-formations',
  standalone: true,
  imports: [MatTabsModule, CommonModule],
  templateUrl: './st-formations.component.html',
  styleUrl: './st-formations.component.css'
})
export class StFormationsComponent {
  selectedTabIndex: number = 0;
  currentFormationType: string = 'Kickoff';

  constructor(private matDialog : MatDialog){

  }
  
  // Available formation types with their display labels
  formations = [
    { type: 'Kickoff', label: 'Kickoff' },
    { type: 'KickoffReturn', label: 'Kickoff Return' },
    { type: 'Punt', label: 'Punt' },
    { type: 'PuntReturn', label: 'Punt Return' },
    { type: 'FieldGoal', label: 'Field Goal' },
    { type: 'FGBlock', label: 'FG Block' }
  ];

  // Sample data structure - replace with your actual data
  formationData: any = {
    Kickoff: { players: [], formation: 'Standard' },
    KickoffReturn: { players: [], formation: 'Wall' },
    Punt: { players: [], formation: 'Spread' },
    PuntReturn: { players: [], formation: 'Safe' },
    FieldGoal: { players: [], formation: 'Holder+Kicker' },
    FGBlock: { players: [], formation: 'Middle Push' }
  };

  onClickTab(event: any): void {
    this.selectedTabIndex = event.index;
    this.currentFormationType = this.formations[this.selectedTabIndex].type;
    this.loadFormationData();
  }

  private loadFormationData(): void {
    // Here you would typically make an API call or service call
    // For now we're using the local formationData
    console.log(`Loading ${this.currentFormationType} formation data`);
    
    // You could add data loading logic here:
    // this.formationService.getFormation(this.currentFormationType).subscribe(...);
  }

  get currentFormation() {
    return this.formationData[this.currentFormationType];
  }

  // Example method to demonstrate formation-specific functionality
  getFormationInstructions(): string {
    switch(this.currentFormationType) {
      case 'Kickoff':
        return 'Standard kickoff formation with coverage lanes';
      case 'KickoffReturn':
        return 'Setup return lanes based on opponent formation';
      case 'Punt':
        return 'Protect the punter and cover all gaps';
      case 'PuntReturn':
        return 'Designated returner with blocking scheme';
      case 'FieldGoal':
        return 'Holder at 7 yards, snapper at 15 yards';
      case 'FGBlock':
        return 'Attack the A-gap with leapers';
      default:
        return 'Select a formation type';
    }
  }
openAddFormationMoadl(){
const dialog= this.matDialog.open(AddFormationComponent,{
  disableClose: true,
});
dialog.afterClosed().subscribe(result =>{
  if(result){
    const formationData: any ={
      
    }
  }
})
}
}