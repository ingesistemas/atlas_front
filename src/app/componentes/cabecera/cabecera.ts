import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { DatosTempServicios } from '../../servicios/datos-temp-servicios';
import { CargandoServicio } from '../../servicios/cargando-servicio';
import { ToastServicio } from '../../servicios/toast-servicio';
import { timer } from 'rxjs';

@Component({
  selector: 'app-cabecera',
  imports: [CommonModule, RouterLink],
  templateUrl: './cabecera.html',
  styleUrl: './cabecera.css',
})
export class Cabecera {
  @Output() toggleMenu = new EventEmitter<void>();
  public datosTempServicio = inject(DatosTempServicios)
  private cargandoServicio = inject(CargandoServicio)
  private router = inject(Router)
  private toastServicio = inject(ToastServicio)

  abrirOffcanvas() {
    this.toggleMenu.emit()
  }

  cerrarSesion(){
    this.cargandoServicio.open("Cerrando sesión.")
    localStorage.removeItem('token')
    this.datosTempServicio.clear()
    localStorage.clear()
    
    timer(2500).subscribe(() => {
      this.toastServicio.show('Sesión cerrada con éxito.', 'success');
      this.cargandoServicio.close();
    });

    timer(3500).subscribe(() => {
      this.router.navigateByUrl("/");
    });
      console.log(this.datosTempServicio.user()?.empresa)
  }
}
