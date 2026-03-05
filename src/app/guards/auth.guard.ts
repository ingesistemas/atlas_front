import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DatosTempServicios } from '../servicios/datos-temp-servicios';


export const authGuard: CanActivateFn = () => {
  const session = inject(DatosTempServicios);
  const router = inject(Router);

  if (session.user()) {
    return true;
  }

  router.navigateByUrl('/ingresar');
  return false;
};
