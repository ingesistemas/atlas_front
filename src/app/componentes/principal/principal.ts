import { Component, ViewChild } from '@angular/core';
import { Cabecera } from "../cabecera/cabecera";
import { Pie } from "../pie/pie";
import { Admin } from "../verticales/admin/admin";
import { RouterLink, RouterOutlet } from '@angular/router';
import { Toast } from "../toast/toast";

@Component({
  selector: 'app-principal',
  imports: [Admin, RouterOutlet, Cabecera, Toast],
  templateUrl: './principal.html',
  styleUrl: './principal.css',
})
export class Principal {
   isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  cerrarMenu() {
    this.isMenuOpen = false;
  }
}
