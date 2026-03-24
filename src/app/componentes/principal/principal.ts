import { Component, inject, ViewChild } from '@angular/core';
import { Cabecera } from "../cabecera/cabecera";
import { Pie } from "../pie/pie";
import { Admin } from "../verticales/admin/admin";
import { RouterLink, RouterOutlet } from '@angular/router';
import { Toast } from "../toast/toast";
import { CargandoServicio } from '../../servicios/cargando-servicio';
import { MensajeModal } from "../modales/mensaje-modal/mensaje-modal";

@Component({
  selector: 'app-principal',
  imports: [Admin, RouterOutlet, Cabecera, Toast, MensajeModal],
  templateUrl: './principal.html',
  styleUrl: './principal.css',
})
export class Principal {
  private cargadoServicio = inject(CargandoServicio)
  isMenuOpen = false;
  ngOnInit(){
    this.cargadoServicio.close()
    console.log(JSON.parse(localStorage.getItem('localidades')!))
    console.log(JSON.parse(localStorage.getItem('barrios')!))
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  cerrarMenu() {
    this.isMenuOpen = false;
  }
}
