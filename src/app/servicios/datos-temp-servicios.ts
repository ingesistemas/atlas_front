import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatosTempServicios {
  private _user = signal<{
    id: number
    email: string
    atlas: number
    id_ciudad: number
    empresa: string
    ciudad: string
  } | null>(null)

  // 👀 lectura segura
  user = this._user.asReadonly()

  // valores derivados
  id = computed(() => this._user()?.id ?? null)
  email = computed(() => this._user()?.email ?? null)
  atlas = computed(() => this._user()?.atlas ?? null)
  id_ciudad = computed(() => this._user()?.id_ciudad ?? null)
  empresa = computed(() => this._user()?.empresa ?? null)
  ciudad = computed(() => this._user()?.ciudad ?? null)

  //isAdmin = computed(() => this._user()?.roleId === 1);

  setUser(user: { id: number; email: string; atlas: number; id_ciudad: number; empresa: string; ciudad: string }) {
    this._user.set(user)
  }

  clear() {
    this._user.set(null)
  }
}
