import { Component, isStandalone } from '@angular/core';
import { StFormationsComponent } from './new-advance-report/st-formations/st-formations.component';
import{ NgxSpinnerModule, NgxSpinner} from 'ngx-spinner';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-advanced-reporting',
     standalone: true,
    imports: [],
    templateUrl: './advanced-reporting.component.html',
    styleUrl: './advanced-reporting.component.css'
})
export class AdvancedReportingComponent {
selectedTabIndex: number=0;
componentMap=[
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
