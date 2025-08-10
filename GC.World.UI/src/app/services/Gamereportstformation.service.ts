import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class GameReportStFormation{
    private formationTypes: any = [
    { id: 1, name: 'Basic Formation', description: 'Basic formation setup', category: 'basic' },
    { id: 2, name: 'Advanced Formation', description: 'Advanced formation configuration', category: 'advanced' },
    { id: 3, name: 'Expert Formation', description: 'Expert level formation', category: 'expert' },
    { id: 4, name: 'Custom Formation', description: 'Custom formation type', category: 'custom' },
    { id: 5, name: 'Standard Formation', description: 'Standard formation layout', category: 'standard' },
    { id: 6, name: 'Premium Formation', description: 'Premium formation features', category: 'premium' }
  ];
    constructor()
    {

    }
    getFormationTypes(formationTypeId: number ): Observable<any>
    {
        const filtered= formationTypeId===0? this.formationTypes: this.formationTypes.filter((f: { id: number; }) => f.id== formationTypeId);
        return of(filtered);

    }

}