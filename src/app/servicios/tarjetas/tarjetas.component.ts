import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { IniciosSService } from '../inicios-s.service';

@Component({
  selector: 'app-pago-tarjeta',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css'],
  imports:[ReactiveFormsModule],
  standalone:true,
})
export default class PagoTarjetaComponent {
  tarjetaForm: FormGroup;
  private apiUrl = 'http://localhost:5000/pagar'; // URL de tu servicio Flask

  constructor(private fb: FormBuilder, private http: HttpClient, private iniciosService: IniciosSService) {
    this.tarjetaForm = this.fb.group({
      titular: [''],
      numero_tarjeta: [''],
      fecha_expiracion: [''],
      cvv: [''],
    });
  }

  onPagar() {
    if (this.tarjetaForm.valid) {
      const datosTarjeta = this.tarjetaForm.value;
      this.iniciosService.procesarPagoo(datosTarjeta).subscribe(
        (response) => {
          console.log('Pago realizado con éxito', response);
        },
        (error) => {
          console.error('Error al realizar el pago', error);
        }
      );
    } else {
      console.error('Formulario inválido');
    }
  }

  onVolver() {
    // Aquí puedes implementar la lógica para volver a la pantalla anterior
    console.log('Volver a la pantalla anterior');
  }
}