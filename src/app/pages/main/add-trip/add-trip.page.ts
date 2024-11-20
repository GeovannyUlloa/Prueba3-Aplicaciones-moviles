import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ViajesService } from '../../../viajes.service';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.page.html',
  styleUrls: ['./add-trip.page.scss'],
})
export class AddTripPage {
  
  nuevoViaje = {
    destino: '',
    conductor: '',
    fecha: '',
    hora: '',
    puntoEncuentro: '',
    pasajerosActuales: 0,
    pasajerosMaximos: 4,
  };

  constructor(private viajesService: ViajesService, private router: Router) {}

  agregarNuevoViaje() {
    if (this.nuevoViaje.destino && this.nuevoViaje.conductor && this.nuevoViaje.fecha && this.nuevoViaje.hora && this.nuevoViaje.puntoEncuentro && this.nuevoViaje.pasajerosActuales >= 0) {
      this.viajesService.agregarViaje(this.nuevoViaje);
      this.router.navigate(['/main/home']);
    } else {
      console.error('Por favor completa todos los campos.');
    }
  }
}