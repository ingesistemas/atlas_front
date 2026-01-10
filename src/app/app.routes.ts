import { Routes } from '@angular/router';
import { Principal } from './componentes/principal/principal';
import { Inicio } from './componentes/inicio/inicio';
import { Ingresar } from './componentes/ingresar/ingresar';
import { ListarRoles } from './componentes/configuraciones/roles/listar-roles/listar-roles';
import { CrearEditarRoles } from './componentes/configuraciones/roles/crear-editar-roles/crear-editar-roles';
import { ListarEmpresas } from './componentes/configuraciones/empresas/listar-empresas/listar-empresas';
import { CrearEditarEmpresas } from './componentes/configuraciones/empresas/crear-editar-empresas/crear-editar-empresas';


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
      { path: 'empresas', component: ListarEmpresas },
      { path: 'crear-editar-empresas', component: CrearEditarEmpresas },
    ]
  },
  
];
