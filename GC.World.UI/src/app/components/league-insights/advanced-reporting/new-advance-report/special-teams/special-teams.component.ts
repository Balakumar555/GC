import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTabsModule } from "@angular/material/tabs";

@Component({
    selector:'app-special-teams',
    standalone : true,
    imports:[MatTabsModule,CommonModule,FormsModule, ReactiveFormsModule ],
    templateUrl:'special-teams.component.html',
    styleUrl:'special-teams.component.css'
})
export class SpecialTeamsComponent{
    stForm!: FormGroup;
    constructor(private fb: FormBuilder){

    }

}