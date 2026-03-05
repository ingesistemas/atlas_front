import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RetornaErrorServicio } from '../../../../servicios/retorna-error-servicio';
import { ToastServicio } from '../../../../servicios/toast-servicio';
import { PeticionServicio } from '../../../../servicios/peticion-servicio';
import { Router, RouterLink } from '@angular/router';
import { CargandoServicio } from '../../../../servicios/cargando-servicio';

@Component({
  selector: 'app-crear-editar-usuario',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './crear-editar-usuario.html',
  styleUrl: './crear-editar-usuario.css',
})
export class CrearEditarUsuario {
  private fb = inject(FormBuilder);
  private retornaErrorService = inject(RetornaErrorServicio);
  private toastService = inject(ToastServicio);
  private peticionServicio = inject(PeticionServicio);
  private router = inject(Router);
  private cargadoServicio = inject(CargandoServicio)

  mensaje: string = ''
  usuario: any = null
  titulo: string = 'Crear usuario'

  formulario = this.fb.group({
    id: [0],
    email: ['', [Validators.required, Validators.email]],
    clave: ['', [Validators.required, Validators.minLength(10)]],
    clave2: ['', [Validators.required, Validators.minLength(10)]],
  });

  ngOnInit(): void {
    this.usuario = history.state?.datos;

    if (this.usuario) {
      this.formulario.patchValue({
        id: this.usuario.id,
        email: this.usuario.email,
      });
      this.titulo = 'Editar usuario'
    }
  }

  aceptar(): void {
    let c = this.formulario.controls['clave'].value
    let c2 = this.formulario.controls['clave2'].value
    if( c != c2){
      this.toastService.show('Las contraseñas ingresadas no coinciden.', 'danger')
    }else{
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

      let url = '/usuarios';
      let tipoPeticion: 'POST' | 'PUT' = 'POST';

      if (id && id !== 0) {
        this.cargadoServicio.open('Actualizando registro...');
        url = `/usuarios/${id}`;   
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
        },
        error: (err) => {
          this.cargadoServicio.close()
          if (err?.errores) {
            // Recorremos todos los campos
            Object.keys(err.errores).forEach(campo => {
              err.errores[campo].forEach((mensaje: string) => {
                this.toastService.show(mensaje, 'danger');
              });
            });
          } else if (err?.mensaje) {
            this.toastService.show(err.mensaje, 'danger');
          }
        }
      });
      setTimeout(()=>{
        this.cargadoServicio.close()
      },2000)
    }
  }

  retornaError(campo: string) {
    const control = this.formulario.get(campo);
    if (control && (control.touched || control.dirty) && control.invalid) {
      return this.retornaErrorService.getErrores(this.formulario, campo);
    }
    return null;
  }
}
