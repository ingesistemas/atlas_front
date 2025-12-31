import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastData, ToastServicio } from '../../servicios/toast-servicio';
declare var bootstrap: any;

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast {
  @ViewChild('toast', { static: true }) toastEl!: ElementRef;

  message = '';
  type: ToastData['type'] = 'info';

  constructor(private toastService: ToastServicio) {}

  ngOnInit() {
    this.toastService.toast$.subscribe(data => {
      this.message = data.message;
      this.type = data.type || 'info';

      const toast = new bootstrap.Toast(this.toastEl.nativeElement, {
        delay: 800
      });
      toast.show();
    });
  }
}
