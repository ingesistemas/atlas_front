import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ToastData {
  message: string;
  type?: 'success' | 'danger' | 'warning' | 'info';
}

@Injectable({
  providedIn: 'root',
})

export class ToastServicio {
  private toastSubject = new Subject<ToastData>();
  toast$ = this.toastSubject.asObservable();

  show(message: string, type: ToastData['type'] = 'info') {
    this.toastSubject.next({ message, type });
  }
}
