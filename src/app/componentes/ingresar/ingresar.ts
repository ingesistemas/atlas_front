import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RetornaErrorServicio } from '../../servicios/retorna-error-servicio';
import { PeticionServicio } from '../../servicios/peticion-servicio';
import { CargandoServicio } from '../../servicios/cargando-servicio';
import { ToastServicio } from '../../servicios/toast-servicio';


@Component({
  selector: 'app-ingresar',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './ingresar.html',
  styleUrl: './ingresar.css',
})
export class Ingresar {
  private fb = inject(FormBuilder);
    private retornaErrorService = inject(RetornaErrorServicio);
    private toastService = inject(ToastServicio);
    private peticionServicio = inject(PeticionServicio);
    private router = inject(Router);
    private cargadoServicio = inject(CargandoServicio)
  
    mensaje: string = '';
    usuario: any = null;
  
    formulario = this.fb.group({
      id: [0],
      nit: ['', [Validators.required]],
      email: ['', [Validators.required]],
      clave: ['', [Validators.required]],
    });

    ingresar(): void {
      if (this.formulario.invalid) {
        this.formulario.markAllAsTouched();
        this.toastService.show('Algunos campos necesitan corrección.','danger');
        return;
      }

      const datos = this.formulario.value;
      const id = datos.id;
  
      let url = '/usuarios/ingresar';
      let tipoPeticion: 'POST' | 'PUT' = 'POST';
      this.cargadoServicio.open('Validando acceso...');
      
      this.peticionServicio
      .peticion(url, datos, tipoPeticion)
      .subscribe({
        next: (data) => {
          console.log(data)
          if (data.error) {
            this.toastService.show(data.mensaje, 'danger');
          } else {
            this.toastService.show(data.mensaje, 'success');
            //this.router.navigateByUrl('/usuarios');
          }
        }
      });
      setTimeout(()=>{
        this.cargadoServicio.close()
      },1000)
    }
  
    /* ngOnInit(): void {
      this.usuario = history.state?.datos;
  
      if (this.usuario) {
        this.formulario.patchValue({
          id: this.usuario.id,
          email: this.usuario.email,
        });
      }
    } */
  
    /* aceptar(): void {
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
            this.router.navigateByUrl('/usuarios');
          }
        }
      });
      setTimeout(()=>{
        this.cargadoServicio.close()
      },1000)
      
    } */
  
    retornaError(campo: string) {
      const control = this.formulario.get(campo);
      if (control && (control.touched || control.dirty) && control.invalid) {
        return this.retornaErrorService.getErrores(this.formulario, campo);
      }
      return null;
    }
}
