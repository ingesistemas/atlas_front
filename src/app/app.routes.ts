import { Routes } from '@angular/router';
import { Principal } from './componentes/principal/principal';
import { Inicio } from './componentes/inicio/inicio';
import { Ingresar } from './componentes/ingresar/ingresar';
import { ListarRoles } from './componentes/configuraciones/roles/listar-roles/listar-roles';
import { CrearEditarRoles } from './componentes/configuraciones/roles/crear-editar-roles/crear-editar-roles';
import { ListarEmpresas } from './componentes/configuraciones/empresas/listar-empresas/listar-empresas';
import { CrearEditarEmpresas } from './componentes/configuraciones/empresas/crear-editar-empresas/crear-editar-empresas';
import { ListarUsuarios } from './componentes/configuraciones/usuarios/listar-usuarios/listar-usuarios';
import { authGuard } from './guards/auth.guard';
import { CrearEditarUsuario } from './componentes/configuraciones/usuarios/crear-editar-usuario/crear-editar-usuario';
import { ListarLocalidades } from './componentes/configuraciones/localidades/listar-localidades/listar-localidades';
import { CrearEditarLocalidades } from './componentes/configuraciones/localidades/crear-editar-localidades/crear-editar-localidades';


export const routes: Routes = [
  {
    path: '',
    component: Inicio
  },
  { 
    path: 'ingresar', 
    component: Ingresar 
  }, 
  {
    path: 'principal',
    component: Principal,
    canActivate: [authGuard],
    children: [  
      { path: 'usuarios', component: ListarUsuarios },  
      { path: 'crear-editar-usuario', component: CrearEditarUsuario }, 
      { path: 'roles', component: ListarRoles },
      { path: 'localidades', component: ListarLocalidades },
      { path: 'crear-editar-localidad', component: CrearEditarLocalidades},
      { path: 'crear-editar-rol', component: CrearEditarRoles },
      { path: 'empresas', component: ListarEmpresas },
      { path: 'crear-editar-empresas', component: CrearEditarEmpresas },
    ]
  },

  
];
