import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Cabecera } from "./componentes/cabecera/cabecera";
import { Pie } from "./componentes/pie/pie";
import { Hero } from "./componentes/hero/hero";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Cabecera, Pie],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('front');
  ngAfterViewInit() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('show');
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.reveal')
      .forEach(el => obs.observe(el));
  }
}
