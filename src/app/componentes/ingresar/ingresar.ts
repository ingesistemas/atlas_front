import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RetornaErrorServicio } from '../../servicios/retorna-error-servicio';
import { PeticionServicio } from '../../servicios/peticion-servicio';
import { CargandoServicio } from '../../servicios/cargando-servicio';
import { ToastServicio } from '../../servicios/toast-servicio';
import { DatosTempServicios } from '../../servicios/datos-temp-servicios';
import { Toast } from "../toast/toast";
import { CatalogosLocales } from '../../servicios/catalogos-locales';


@Component({
  selector: 'app-ingresar',
  imports: [RouterLink, ReactiveFormsModule, Toast],
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
    private datosTemServicio = inject(DatosTempServicios)
    private catalogosServicio = inject(CatalogosLocales)
  
    mensaje: string = '';
    usuario: any = null;
  
    formulario = this.fb.group({
      id: [0],
      nit: ['900900900', [Validators.required]],
      email: ['ingesistemas.silva@gmail.com', [Validators.required]],
      clave: ['001', [Validators.required]],
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
      
      this.peticionServicio.peticion('/usuarios/ingresar',
        {
          nit: this.formulario.value.nit,
          email: this.formulario.value.email,
          clave: this.formulario.value.clave
        },
        'POST'
      ).subscribe({
        next: (res) => {
          if(res.error){
            setTimeout(()=>{
              this.cargadoServicio.close()
              this.toastService.show(res.mensaje, 'danger')
            },1000)
          }else{
            this.toastService.show(res.mensaje, 'success')
            localStorage.setItem('token', res.token);
            //console.log('TOKEN GUARDADO:', res.token);
            console.log(res)

            // 2️⃣ Guardas el usuario en el estado (SIGNAL)
            this.datosTemServicio.setUser({
              id: res.user.id,
              email: res.user.email,
              atlas: res.user.atlas,
              id_ciudad: res.user.id_ciudad,
              empresa: res.user.empresa,
              ciudad: res.user.ciudad
            });
           
            this.catalogosServicio.actualizarCatalogos(() => {
              this.router.navigateByUrl("/principal");
            });
          }
          
        },
        error: (err) => {
          console.error(err);
          setTimeout(()=>{
            this.cargadoServicio.close()
          },1000)
        }
      });
    }
  
    retornaError(campo: string) {
      const control = this.formulario.get(campo);
      if (control && (control.touched || control.dirty) && control.invalid) {
        return this.retornaErrorService.getErrores(this.formulario, campo);
      }
      return null;
    }
}
