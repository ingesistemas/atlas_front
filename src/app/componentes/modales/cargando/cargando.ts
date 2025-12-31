import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-cargando',
  imports: [MatProgressSpinnerModule],
  templateUrl: './cargando.html',
  styleUrl: './cargando.css',
})
export class Cargando {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { mensaje?: string }
  ) {}
}
