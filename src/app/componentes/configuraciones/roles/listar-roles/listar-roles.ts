import { Router, RouterLink } from "@angular/router";
import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PeticionServicio } from "../../../../servicios/peticion-servicio";
import { CommonModule, DatePipe } from "@angular/common";
import { MatTooltipModule } from "@angular/material/tooltip";
import { CargandoServicio } from "../../../../servicios/cargando-servicio";
import { timeout } from "rxjs";

export interface ItemTabla {
  id: string;
  rol: string;
  activo: number; // o boolean;
  created_at: string;
}

@Component({
  selector: 'app-listar-roles',
  standalone: true,
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
  templateUrl: './listar-roles.html',
  styleUrl: './listar-roles.css',
})
export class ListarRoles implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'rol', 'create_at', 'opciones'];
  dataSource: MatTableDataSource<ItemTabla> = new MatTableDataSource<ItemTabla>([]);
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
    this.dataSource.filterPredicate = (data: ItemTabla, filter: string) => {
      const texto = filter.trim().toLowerCase();
      return (
        data.id.toString().toLowerCase().includes(texto) ||
        data.rol.toLowerCase().includes(texto) ||
        (data.created_at?.toLowerCase().includes(texto) ?? false)
      );
    };

    this.peticion('/roles');
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

  editar(rol: any): void {
    this.router.navigate(['/principal/crear-editar-rol'], {
      state: { datos: rol }
    });
  }

  estado(rol: any): void {
    this.cargadoServicio.open('Actualizando estado...');
    const id = rol.id;

    this.peticionServicio
    .peticion(`/roles/${id}`, null, 'DELETE')
    .subscribe({
      next: (resp) => {
        this.mensaje = resp.mensaje;

        // 🔹 1. Copia del array
        const data = [...this.dataSource.data];

        // 🔹 2. Buscar índice del rol
        const index = data.findIndex(r => r.id === id);

        if (index !== -1) {
          // 🔹 3. Reemplazar con el rol actualizado
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
        console.log(data)
        this.mensaje = data.mensaje;
        this.dataSource.data = data.data;
      }
    });
    setTimeout(()=>{
      this.cargadoServicio.close()
    },1000)
  }
}
