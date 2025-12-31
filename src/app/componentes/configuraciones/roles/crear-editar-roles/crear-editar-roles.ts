import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RetornaErrorServicio } from '../../../../servicios/retorna-error-servicio';
import { ToastServicio } from '../../../../servicios/toast-servicio';
import { PeticionServicio } from '../../../../servicios/peticion-servicio';
import { CargandoServicio } from '../../../../servicios/cargando-servicio';

@Component({
  selector: 'app-crear-editar-roles',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './crear-editar-roles.html',
  styleUrl: './crear-editar-roles.css',
})
export class CrearEditarRoles implements OnInit {

  private fb = inject(FormBuilder);
  private retornaErrorService = inject(RetornaErrorServicio);
  private toastService = inject(ToastServicio);
  private peticionServicio = inject(PeticionServicio);
  private router = inject(Router);
  private cargadoServicio = inject(CargandoServicio)

  mensaje: string = '';
  rol: any = null;

  formulario = this.fb.group({
    id: [0],
    rol: ['', [Validators.required, Validators.minLength(2)]],
  });

  ngOnInit(): void {
    this.rol = history.state?.datos;

    if (this.rol) {
      this.formulario.patchValue({
        id: this.rol.id,
        rol: this.rol.rol,
      });
    }
  }

  aceptar(): void {

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      this.toastService.show(
        'Algunos campos necesitan corrección.',
        'danger'
      );
      return;
    }

    const datos = this.formulario.value;
    const id = datos.id;

    let url = '/roles';
    let tipoPeticion: 'POST' | 'PUT' = 'POST';

    if (id && id !== 0) {
      this.cargadoServicio.open('Actualizando registro...');
      url = `/roles/${id}`;   
      tipoPeticion = 'PUT';
    }else{
      this.cargadoServicio.open('Creando registro...');
    }

    this.peticionServicio
    .peticion(url, datos, tipoPeticion)
    .subscribe({
      next: (data) => {
        if (data.error) {
          this.toastService.show(data.mensaje, 'danger');
        } else {
          this.toastService.show(data.mensaje, 'success');
          this.router.navigateByUrl('/principal/roles');
        }
      }
    });
    setTimeout(()=>{
      this.cargadoServicio.close()
    },1000)
    
  }

  retornaError(campo: string) {
    const control = this.formulario.get(campo);
    if (control && (control.touched || control.dirty) && control.invalid) {
      return this.retornaErrorService.getErrores(this.formulario, campo);
    }
    return null;
  }
}
