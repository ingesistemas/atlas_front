import { Router, RouterLink } from "@angular/router"
import { AfterViewInit, Component, Inject, inject, OnInit, ViewChild } from '@angular/core'
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'
import { MatSort, MatSortModule } from '@angular/material/sort'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { PeticionServicio } from "../../../../servicios/peticion-servicio"
import { CommonModule, DatePipe } from "@angular/common"
import { MatTooltipModule } from "@angular/material/tooltip"
import { CargandoServicio } from "../../../../servicios/cargando-servicio"
import { PCardinalPipe } from "../../../../pipes/p-cardinal-pipe"
import { ToastServicio } from "../../../../servicios/toast-servicio"
import { ModalServicio } from "../../../../servicios/modal-servicio"


export interface ItemTabla {
  id: string
  localidad: string
  p_cardinal: string
  activo: number
  created_at: string
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
<<<<<<< HEAD
  displayedColumns: string[] = ['localidad', 'p_cardinal', 'id_ficha_tecnica', 'create_at', 'opciones'];
  dataSource: MatTableDataSource<ItemTabla> = new MatTableDataSource<ItemTabla>([]);
  mensaje: string = '';
  datos: any = [];
=======
  displayedColumns: string[] = ['localidad', 'p_cardinal', 'id_ficha_tecnica', 'create_at', 'opciones']
  dataSource: MatTableDataSource<ItemTabla> = new MatTableDataSource<ItemTabla>([])
  mensaje: string = ''
  datos: any = []
>>>>>>> 9ce6731 (Establecer localstorage en localidades)

  private peticionServicio = inject(PeticionServicio)
  private router = inject(Router)
  private cargadoServicio = inject(CargandoServicio)
  private toastMensajeServicio = inject(ToastServicio)
  private modalMensajeServicio = inject(ModalServicio)

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  ngOnInit(): void {
    this.cargadoServicio.open('Cargando registros...')
    // 🔹 Filtro personalizado
    this.dataSource.filterPredicate = (data: ItemTabla, filter: string) => {
<<<<<<< HEAD
      const texto = filter.trim().toLowerCase();
      const pCardinal = this.pCardinalTransform(data.p_cardinal).toLowerCase();
=======
      const texto = filter.trim().toLowerCase()
      const pCardinal = this.pCardinalTransform(data.p_cardinal).toLowerCase()
>>>>>>> 9ce6731 (Establecer localstorage en localidades)
      return (
        data.id.toString().toLowerCase().includes(texto) ||
        data.localidad.toLowerCase().includes(texto) ||
        data.p_cardinal.toLowerCase().includes(texto) ||
        (data.created_at?.toLowerCase().includes(texto) ?? false) ||
        pCardinal.includes(texto)
<<<<<<< HEAD
      );
    };
=======
      )
    }
>>>>>>> 9ce6731 (Establecer localstorage en localidades)

    this.peticion('/localidades')
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }

  editar(localidad: any): void {
    this.router.navigate(['/principal/crear-editar-localidad'], {
      state: { datos: localidad }
    })
  }

  estado(localidad: any): void {
    this.cargadoServicio.open('Actualizando estado...')
    const id = localidad.id

    this.peticionServicio
    .peticion(`/localidades/${id}`, null, 'DELETE')
    .subscribe({
      next: (resp) => {
        console.log(resp)
<<<<<<< HEAD
        this.mensaje = resp.mensaje;
=======
        this.mensaje = resp.mensaje
>>>>>>> 9ce6731 (Establecer localstorage en localidades)
        
        // 🔹 1. Copia del array
        const data = [...this.dataSource.data]

        // 🔹 2. Buscar índice de la localidad
        const index = data.findIndex(r => r.id === id)

        if (index !== -1) {
          // 🔹 3. Reemplazar con la localidad actualizado
          data[index] = {
            ...data[index],
            activo: resp.data.activo
          }

          // 🔹 4. Asignar nuevamente → fuerza render
          this.dataSource.data = data
        }
      }
    })
    setTimeout(()=>{
        this.cargadoServicio.close()
    }, 1000)
    
  }

  pCardinalTransform(valor: string): string {
    switch(valor){
<<<<<<< HEAD
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
=======
      case 'N': return 'Norte'
      case 'S': return 'Sur'
      case 'O': return 'Oriente'
      case 'OC': return 'Occidente'
      case 'C': return 'Centro'
      case 'NO': return 'Nororiente'
      case 'NOC': return 'Noroccidente'
      case 'SO': return 'Suroriente'
      case 'SOC': return 'Suroccidente'

      default: return valor
>>>>>>> 9ce6731 (Establecer localstorage en localidades)
    }
  }


  // 🔹 PETICIÓN USANDO EL MÉTODO UNIFICADO
  
  peticion(url: string): void {
    this.peticionServicio
    .peticion(url, this.datos, 'GET')
    .subscribe({
      next: (data) => {
        console.log(data)
<<<<<<< HEAD
        this.mensaje = data.mensaje;
        this.dataSource.data = data.data;
=======
        this.mensaje = data.mensaje
        this.dataSource.data = data.data
        localStorage.setItem('localidades', JSON.stringify(data.data))
        this.toastMensajeServicio.show(this.mensaje, "success");
      },
      error: (err) => {
        this.mensaje = 'No se pudo obtener la información.'
        const data = localStorage.getItem('localidades')
        this.dataSource.data = data ? JSON.parse(data) : []
        this.mensaje = 'Datos cargados localmente'
        this.cargadoServicio.close()
        this.modalMensajeServicio.abrirModal({
          titulo: 'Atlas Aps',
          mensaje: this.mensaje
        },() => {
          //this.toastMensajeServicio.show(this.mensaje, "success");
        })
      },

      complete: () => {
        this.cargadoServicio.close()
>>>>>>> 9ce6731 (Establecer localstorage en localidades)
      }
    })
  }
}
