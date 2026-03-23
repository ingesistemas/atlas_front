import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RetornaErrorServicio } from '../../../../servicios/retorna-error-servicio';
import { ToastServicio } from '../../../../servicios/toast-servicio';
import { PeticionServicio } from '../../../../servicios/peticion-servicio';
import { CargandoServicio } from '../../../../servicios/cargando-servicio';
import { DatosTempServicios } from '../../../../servicios/datos-temp-servicios';

@Component({
  selector: 'app-crear-editar-localidades',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './crear-editar-localidades.html',
  styleUrl: './crear-editar-localidades.css',
})
export class CrearEditarLocalidades {
  private fb = inject(FormBuilder)
  private retornaErrorService = inject(RetornaErrorServicio)
  private toastService = inject(ToastServicio)
  private peticionServicio = inject(PeticionServicio)
  private router = inject(Router)
  private cargadoServicio = inject(CargandoServicio)
  private datosTempServicio = inject(DatosTempServicios)

  mensaje: string = '';
  localidades: any = null;
  tituloFormulario = "Crear localidad"

  formulario = this.fb.group({
    id: [0],
    localidad: ['', [Validators.required, Validators.minLength(2)]],
    id_ciudad: [this.datosTempServicio.id_ciudad(), [Validators.required]],
    p_cardinal: ['', [Validators.required]],
    ciudad: [{value: this.datosTempServicio.ciudad(), disabled: true}, [Validators.required]]
  });

  ngOnInit(): void {
    this.localidades = history.state?.datos;
    if (this.localidades) {
      this.formulario.patchValue({
        id: this.localidades.id,
        localidad: this.localidades.localidad,
        p_cardinal: this.localidades.p_cardinal,
        id_ciudad: this.datosTempServicio.id_ciudad() 
      });
      this.tituloFormulario = "Editar localidad"
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

    let url = '/localidades';
    let tipoPeticion: 'POST' | 'PUT' = 'POST';

    if (id && id !== 0) {
      this.cargadoServicio.open('Actualizando registro...');
      url = `/localidades/${id}`;   
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
          this.router.navigateByUrl('/principal/localidades');
        }
      },
      error: (err) => {
        console.log(err)
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

  retornaError(campo: string) {
    const control = this.formulario.get(campo);
    if (control && (control.touched || control.dirty) && control.invalid) {
      return this.retornaErrorService.getErrores(this.formulario, campo);
    }
    return null;
  }
}
