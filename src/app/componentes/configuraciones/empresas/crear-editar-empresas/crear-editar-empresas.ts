import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RetornaErrorServicio } from '../../../../servicios/retorna-error-servicio';
import { ToastServicio } from '../../../../servicios/toast-servicio';
import { PeticionServicio } from '../../../../servicios/peticion-servicio';
import { CargandoServicio } from '../../../../servicios/cargando-servicio';

@Component({
  selector: 'app-crear-editar-empresas',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './crear-editar-empresas.html',
  styleUrl: './crear-editar-empresas.css',
})
export class CrearEditarEmpresas {
  private fb = inject(FormBuilder);
  private retornaErrorService = inject(RetornaErrorServicio);
  private toastService = inject(ToastServicio);
  private peticionServicio = inject(PeticionServicio);
  private router = inject(Router);
  private cargadoServicio = inject(CargandoServicio)

  mensaje: string = ''
  empresa: any = null
  dptos: any = []
  ciudades: any = []
  filtroCiudades: any = []
  titulo: string = 'Crear empresa'

  formulario = this.fb.group({
    id: [0],
    nit: ['', [Validators.required, Validators.minLength(5)]],
    dig_ver: ['', [Validators.required, Validators.minLength(1)]],
    nombre: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.maxLength(250), Validators.email]],
    web: ['', [Validators.maxLength(250)]],
    lema: ['', [Validators.maxLength(250)]],
    id_dpto: [0],
    id_ciudad: [0, [Validators.required, Validators.min(1)]],
    
  });

  ngOnInit(): void {
    this.empresa = history.state?.datos;
    console.log(this.empresa)
    
    this.peticionServicio.peticion('/dptos', null, 'GET')
    .subscribe({
      next: (data) => {
        if (data.error) {
          this.toastService.show(data.mensaje, 'danger');
        }else{
          this.dptos = data.data
        } 
      }
    });

    if(!localStorage.getItem('ciudades')){
      alert('No se encontraron ciudades.')
      this.peticionServicio.peticion('/ciudades', null, 'GET')
      .subscribe({
        next: (data) => {
          if (data.error) {
            this.toastService.show(data.mensaje, 'danger');
          }else{
            this.ciudades = data.data
            this.filtroCiudades = this.ciudades
            localStorage.setItem('ciudades', JSON.stringify(this.ciudades))
          } 
        }
      });
    }else{
      let mCiudades = localStorage.getItem('ciudades')!
      this.ciudades = JSON.parse(mCiudades)
      this.filtroCiudades = this.ciudades
    }

    if (this.empresa) {
      this.formulario.patchValue({
        id: this.empresa.id,
        nit: this.empresa.nit,
        dig_ver: this.empresa.dig_ver,
        nombre: this.empresa.nombre,
        email: this.empresa.email,
        web: this.empresa.web,
        lema: this.empresa.lema,
        id_dpto: this.empresa.ciudad.id_dep,
        id_ciudad: this.empresa.ciudad.id
        
      });
      this.titulo = 'Editar empresa'
    }

  }

  filtrarCiudades(idDep: number | string): void {
    this.filtroCiudades = this.ciudades.filter(
      (c:any) => c.id_dep == idDep
    );
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

    let url = '/empresas';
    let tipoPeticion: 'POST' | 'PUT' = 'POST';

    if (id && id !== 0) {
      this.cargadoServicio.open('Actualizando registro...');
      url = `/empresas/${id}`;   
      tipoPeticion = 'PUT';
    }else{
      this.cargadoServicio.open('Creando registro...');
    }

    this.peticionServicio
    .peticion(url, datos, tipoPeticion)
    .subscribe({
      next: (data) => {
        this.toastService.show(data.mensaje, 'success');
        this.router.navigateByUrl('/principal/empresas');
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

  }

  retornaError(campo: string) {
    const control = this.formulario.get(campo);
    if (control && (control.touched || control.dirty) && control.invalid) {
      return this.retornaErrorService.getErrores(this.formulario, campo);
    }
    return null;
  }
}
