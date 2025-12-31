import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PeticionServicio {

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  // 🔹 MÉTODO ÚNICO
  peticion(
    url: string,
    datos: any,
    tipoPeticion: 'POST' | 'PUT' | 'GET' | 'DELETE'
  ): Observable<any> {

    switch (tipoPeticion) {
      case 'POST':
        return this.peticionPOST(url, datos);

      case 'PUT':
        return this.peticionPUT(url, datos);

      case 'GET':
        return this.peticionGET(url);
      
      case 'DELETE':
        return this.peticionDELETE(url, datos);

        

      default:
        return throwError(() => new Error('Tipo de petición no válido'));
    }
  }

  private peticionPOST(url: string, datos: any): Observable<any> {
    const headers = new HttpHeaders({});
    return this.http.post<any>(this.apiUrl + url, datos, { headers }).pipe(
      map(res => res),
      catchError(err =>
        throwError(() => new Error(err.error?.message || 'Error en POST'))
      )
    );
  }

  private peticionPUT(url: string, datos: any): Observable<any> {
    const headers = new HttpHeaders({});
    return this.http.put<any>(this.apiUrl + url, datos, { headers }).pipe(
      map(res => res),
      catchError(err =>
        throwError(() => new Error(err.error?.message || 'Error en PUT'))
      )
    );
  }

  private peticionDELETE(url: string, datos: any): Observable<any> {
    const headers = new HttpHeaders({});

    return this.http.delete<any>(this.apiUrl + url, {
      headers,
      body: datos
    }).pipe(
      map(res => res),
      catchError(err =>
        throwError(() => new Error(err.error?.message || 'Error en DELETE'))
      )
    );
  }

  private peticionGET(url: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + url).pipe(
      map(res => res),
      catchError(err =>
        throwError(() => new Error('Error en GET'))
      )
    );
  }
}




/* peticionPOSTToken(url: string, datos:any){
      let jwtToken = this.autenticaServicio.tokenActual()
      if (!jwtToken) {
        console.error('Token JWT ausente');
        return throwError(() => new Error('No hay token de autenticación.'));
      }else{
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${jwtToken}`
        });
  
        return this.http.post<IRespuesta>(this.apiUrl + url, datos, { headers }).pipe(
          map(response => response), // asumimos que la API devuelve { status, data }
          catchError(error => {
            return throwError(() => new Error('No se pudieron cargar los datos.', error));
          })
        );
      }
    }
  
    peticionGETToken(url: string){
      let jwtToken = this.autenticaServicio.tokenActual()
      if (!jwtToken) {
        console.error('Token JWT ausente');
        return throwError(() => new Error('No hay token de autenticación.'));
      }else{
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${jwtToken}`
        });
  
        return this.http.get<IRespuesta>(this.apiUrl + url, { headers }).pipe(
          map(response => response), // asumimos que la API devuelve { status, data }
          catchError(error => {
            console.error('Error al obtener comandos:', error);
            return throwError(() => new Error('No se pudieron cargar los datos.', error));
          })
        );
      }
    } */