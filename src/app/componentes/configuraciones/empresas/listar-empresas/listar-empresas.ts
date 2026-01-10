import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { PeticionServicio } from '../../../../servicios/peticion-servicio';
import { CargandoServicio } from '../../../../servicios/cargando-servicio';

export interface ItemTabla {
  id: string;
  nit: string;
  nombre: string;
  id_ciudad: number;
  activo: number; // o boolean;
  created_at: string;
}

@Component({
  selector: 'app-listar-empresas',
  imports: [
    RouterLink,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    DatePipe,
    CommonModule,
    MatTooltipModule
  ],
  templateUrl: './listar-empresas.html',
  styleUrl: './listar-empresas.css',
})
export class ListarEmpresas {
  displayedColumns: string[] = ['nit', 'nombre', 'ciudad', 'email', 'web', 'lema', 'create_at', 'opciones'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  mensaje: string = '';
  datos: any = [];

  private peticionServicio = inject(PeticionServicio);
  private router = inject(Router);
  private cargadoServicio = inject(CargandoServicio)

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.cargadoServicio.open('Cargando registros...')
    // 🔹 Filtro personalizado
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const texto = filter.trim().toLowerCase();

      return (
        data.id.toString().includes(texto) ||
        data.nit?.toLowerCase().includes(texto) ||
        data.nombre?.toLowerCase().includes(texto) ||
        data.ciudad?.ciudad?.toLowerCase().includes(texto) ||
        data.ciudad?.dpto?.departamento?.toLowerCase().includes(texto) ||
        data.lema?.toLowerCase().includes(texto) ||
        (data.created_at?.toLowerCase().includes(texto) ?? false)
      );
      
    };

    this.peticion('/empresas');
    setTimeout(()=>{
      this.cargadoServicio.close()
    },1000)
    
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editar(empresa: any): void {
    this.router.navigate(['/principal/crear-editar-empresas'], {
      state: { datos: empresa }
    });
  }

  estado(empresa: any): void {
    this.cargadoServicio.open('Actualizando estado...');
    const id = empresa.id;

    this.peticionServicio
    .peticion(`/empresas/${id}`, null, 'DELETE')
    .subscribe({
      next: (resp) => {
        this.mensaje = resp.mensaje;

        // 🔹 1. Copia del array
        const data = [...this.dataSource.data];

        // 🔹 2. Buscar índice del empresa
        const index = data.findIndex(r => r.id === id);

        if (index !== -1) {
          // 🔹 3. Reemplazar con el empresa actualizado
          data[index] = {
            ...data[index],
            activo: resp.data.activo
          };

          // 🔹 4. Asignar nuevamente → fuerza render
          this.dataSource.data = data;
        }
      }
    });
    setTimeout(()=>{
       this.cargadoServicio.close()
    }, 1000)
   
  }


  // 🔹 PETICIÓN USANDO EL MÉTODO UNIFICADO
  peticion(url: string): void {
    this.peticionServicio
    .peticion(url, this.datos, 'GET')
    .subscribe({
      next: (data) => {
        this.mensaje = data.mensaje;
        this.dataSource.data = data.data;
      }
    });
    setTimeout(()=>{
      this.cargadoServicio.close()
    },1000)
  }
}
