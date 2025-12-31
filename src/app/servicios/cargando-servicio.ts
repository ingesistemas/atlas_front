import { Injectable, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Cargando } from '../componentes/modales/cargando/cargando';


@Injectable({
  providedIn: 'root',
})
export class CargandoServicio {
  private dialog = inject(MatDialog);
  private dialogRef?: MatDialogRef<Cargando>;

  open(mensaje?: string): void {
    if (this.dialogRef) return; // evita duplicados

    this.dialogRef = this.dialog.open(Cargando, {
      disableClose: true,
      panelClass: 'loading-dialog',
      data: { mensaje }
    });
  }

  close(): void {
    this.dialogRef?.close();
    this.dialogRef = undefined;
  }
}
