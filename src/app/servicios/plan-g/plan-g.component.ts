import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plan-g',
  templateUrl: './plan-g.component.html',
  styleUrls: ['./plan-g.component.css']
})
export default class PlanGComponent implements OnInit {

  ngOnInit(): void {
    // Agregar eventos de clic a los elementos con clase específica
    const basicHeader = document.querySelector('.plan-basic-header') as HTMLElement;
    const premiumHeader = document.querySelector('.plan-premium-header') as HTMLElement;

    if (basicHeader) {
      basicHeader.addEventListener('click', () => this.toggleDetails('basic-details'));
    }

    if (premiumHeader) {
      premiumHeader.addEventListener('click', () => this.toggleDetails('premium-details'));
    }

    // Agregar evento para el botón de "Volver"
    const backButton = document.querySelector('.btn-back') as HTMLElement;
    if (backButton) {
      backButton.addEventListener('click', () => {
        window.history.back();
      });
    }
  }

  toggleDetails(id: string): void {
    const details = document.getElementById(id);
    if (details) {
      details.classList.toggle('show');
    }
  }
}
