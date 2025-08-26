import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-add-formation',
     standalone: true,
    imports: [],
    templateUrl: './add-formation.component.html',
    styleUrl: './add-formation.component.css'
})
export class AddFormationComponent {

  constructor(private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}

closeModal(){
this.matDialog.closeAll()
}
}
