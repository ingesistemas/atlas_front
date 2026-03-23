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
import { PCardinalPipe } from "../../../../pipes/p-cardinal-pipe";

export interface ItemTabla {
  id: string;
  localidad: string;
  p_cardinal: string;
  activo: number; // o boolean;
  created_at: string;
}

@Component({
  selector: 'app-listar-localidades',
  imports: [
    RouterLink,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    DatePipe,
    CommonModule,
    MatTooltipModule,
    PCardinalPipe
  ],
  templateUrl: './listar-localidades.html',
  styleUrl: './listar-localidades.css',
})
export class ListarLocalidades {
  displayedColumns: string[] = ['localidad', 'p_cardinal', 'id_ficha_tecnica', 'create_at', 'opciones'];
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
      const pCardinal = this.pCardinalTransform(data.p_cardinal).toLowerCase();
      return (
        data.id.toString().toLowerCase().includes(texto) ||
        data.localidad.toLowerCase().includes(texto) ||
        data.p_cardinal.toLowerCase().includes(texto) ||
        (data.created_at?.toLowerCase().includes(texto) ?? false) ||
        pCardinal.includes(texto)
      );
    };

    this.peticion('/localidades');
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

  editar(localidad: any): void {
    this.router.navigate(['/principal/crear-editar-localidad'], {
      state: { datos: localidad }
    });
  }

  estado(localidad: any): void {
    this.cargadoServicio.open('Actualizando estado...');
    const id = localidad.id;

    this.peticionServicio
    .peticion(`/localidades/${id}`, null, 'DELETE')
    .subscribe({
      next: (resp) => {
        console.log(resp)
        this.mensaje = resp.mensaje;
        
        // 🔹 1. Copia del array
        const data = [...this.dataSource.data];

        // 🔹 2. Buscar índice de la localidad
        const index = data.findIndex(r => r.id === id);

        if (index !== -1) {
          // 🔹 3. Reemplazar con la localidad actualizado
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

  pCardinalTransform(valor: string): string {
    switch(valor){
      case 'N': return 'Norte';
      case 'S': return 'Sur';
      case 'O': return 'Oriente';
      case 'OC': return 'Occidente';
      case 'C': return 'Centro';
      case 'NO': return 'Nororiente';
      case 'NOC': return 'Noroccidente';
      case 'SO': return 'Suroriente';
      case 'SOC': return 'Suroccidente'

      default: return valor;
    }
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
