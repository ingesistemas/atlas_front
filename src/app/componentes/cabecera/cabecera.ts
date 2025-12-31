import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-cabecera',
  imports: [CommonModule, RouterLink],
  templateUrl: './cabecera.html',
  styleUrl: './cabecera.css',
})
export class Cabecera {
  @Output() toggleMenu = new EventEmitter<void>();

  abrirOffcanvas() {
    this.toggleMenu.emit();
  }
}
