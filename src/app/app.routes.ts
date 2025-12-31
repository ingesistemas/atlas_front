import { Routes } from '@angular/router';
import { Principal } from './componentes/principal/principal';
import { Inicio } from './componentes/inicio/inicio';
import { Ingresar } from './componentes/ingresar/ingresar';
import { ListarRoles } from './componentes/configuraciones/roles/listar-roles/listar-roles';
import { CrearEditarRoles } from './componentes/configuraciones/roles/crear-editar-roles/crear-editar-roles';


export const routes: Routes = [
  {
    path: '',
    component: Inicio
  },
  {
    path: 'principal',
    component: Principal,
    children: [
      { path: 'ingresar', component: Ingresar },   
      { path: 'roles', component: ListarRoles },
      { path: 'crear-editar-rol', component: CrearEditarRoles },
    ]
  },
  
];
