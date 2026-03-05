import { Component, inject, ViewChild } from '@angular/core';
import { Cabecera } from "../cabecera/cabecera";
import { Pie } from "../pie/pie";
import { Admin } from "../verticales/admin/admin";
import { RouterLink, RouterOutlet } from '@angular/router';
import { Toast } from "../toast/toast";
import { CargandoServicio } from '../../servicios/cargando-servicio';

@Component({
  selector: 'app-principal',
  imports: [Admin, RouterOutlet, Cabecera, Toast],
  templateUrl: './principal.html',
  styleUrl: './principal.css',
})
export class Principal {
  private cargadoServicio = inject(CargandoServicio)
  isMenuOpen = false;
  ngOnInit(){
    this.cargadoServicio.close()
  }

    

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  cerrarMenu() {
    this.isMenuOpen = false;
  }
}
