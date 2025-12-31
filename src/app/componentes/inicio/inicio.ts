import { Component } from '@angular/core';
import { Hero } from "../hero/hero";
import { Modulos } from "../modulos/modulos";
import { ComoFunciona } from "../como-funciona/como-funciona";

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [Hero, Modulos, ComoFunciona],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {
  ngAfterViewInit() {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('show'));
  }
}
