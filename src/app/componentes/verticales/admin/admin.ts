import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { A11yModule } from "@angular/cdk/a11y";

@Component({
  selector: 'app-admin',
  imports: [CommonModule, RouterLink, A11yModule],
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
          link: '/principal/crear-editar-usuario'
        },
        {
          label: 'Listar',
          icon: 'bi bi-shield-lock',
          link: '/principal/usuarios'
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
          label: 'Empresas',
          icon: 'bi bi-bell',
          link: '/principal/empresas'
        },
        {
          label: 'Localidades',
          icon: 'bi bi-bell',
          link: '/principal/localidades'
        },
        {
          label: 'Barrios',
          icon: 'bi bi-bell',
          link: '/principal/barrios'
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
