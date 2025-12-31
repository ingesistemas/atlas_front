import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, RouterLink],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {

  accordionData = [
    {
      id: 'uno',
      title: 'Usuarios',
      items: [
        {
          label: 'Registrar',
          icon: 'bi bi-people',
          link: '/usuarios'
        },
        {
          label: 'Listar',
          icon: 'bi bi-shield-lock',
          link: '/listar'
        }
      ]
    },
    {
      id: 'dos',
      title: 'Configuraciones',
      items: [
        {
          label: 'Roles',
          icon: 'bi bi-gear',
          link: '/principal/roles'
        },
        {
          label: 'Barrios',
          icon: 'bi bi-bell',
          link: '/barrios'
        }
      ]
    }
  ];

  
  @Input() isOpen = false; 
  @Output() close = new EventEmitter<void>(); // emitirá evento cuando se cierre

  cerrar() {
    this.close.emit(); // informa al padre que se cerró
  }
}
