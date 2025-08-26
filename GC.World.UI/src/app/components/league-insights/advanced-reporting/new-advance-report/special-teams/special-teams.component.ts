import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";


@Component({
    selector:'app-special-teams',
    standalone : true,
    imports:[CommonModule,FormsModule, ReactiveFormsModule ],
    templateUrl:'special-teams.component.html',
    styleUrl:'special-teams.component.css'
})
export class SpecialTeamsComponent{
    stForm!: FormGroup;
    constructor(private fb: FormBuilder){

    }

}