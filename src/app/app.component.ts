import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import PrincipalComponent from "./principal/principal.component";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PrincipalComponent , ReactiveFormsModule ,CommonModule ,RouterLink ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GlamS';
}
