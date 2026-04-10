import { Component, inject } from '@angular/core'
import { ModalServicio } from '../../../servicios/modal-servicio'
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-mensaje-modal',
  imports: [NgClass],
  templateUrl: './mensaje-modal.html',
  styleUrl: './mensaje-modal.css',
})
export class MensajeModal {
  data: any = null
  private modalMensajeServicio = inject(ModalServicio)

  constructor() {
    
  }

  ngOnInit() {
    this.modalMensajeServicio.modalState$.subscribe(res => {
      this.data = res;
    });
  }

  cerrar() {
    this.modalMensajeServicio.cerrarModal();
  }
}
