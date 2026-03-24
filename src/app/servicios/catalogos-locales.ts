import { inject, Injectable } from '@angular/core';
import { PeticionServicio } from './peticion-servicio';
import { CargandoServicio } from './cargando-servicio';
import { ToastServicio } from './toast-servicio';

@Injectable({
  providedIn: 'root',
})
export class CatalogosLocales {
  private peticionServicio = inject(PeticionServicio);
  private mensaje: string = ''

  private cargadoServicio = inject(CargandoServicio)
  private mensajeServicio = inject(ToastServicio)

  actualizarCatalogos(callback?: () => void){
    let total = 1;
    let completados = 0;

    const finalizar = () => {
      completados++;
      if (completados === total && callback) {
        callback();
      }
    };

    this.cargarCatalogo('/localidades', 'localidades', finalizar);
    //this.cargarCatalogo('/barrios', 'barrios', finalizar);
  }

  private cargarCatalogo(url: string, clave: string, done: () => void): void {
    this.peticionServicio
      .peticion(url, null, 'GET')
      .subscribe({

        next: (data) => {
          localStorage.setItem(clave, JSON.stringify(data.data));
        },

        error: (err) => {
          console.error(err);
          this.mensajeServicio.show('No se pudo obtener ' + clave, 'danger');
          this.cargadoServicio.close();
          done(); 
        },

        complete: () => {
          this.cargadoServicio.close();
          done();
        }

      });
  }
}
