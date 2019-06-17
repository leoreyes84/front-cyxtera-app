import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { ClientModel } from '../models/client.model';

@Injectable({
    providedIn: 'root'
  })
  export class ClientService {

    private headerJson = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    private endpoint = '/clients';

    constructor(private httpClient: HttpClient) { }

    /** It returns all by shared key */
    getBySharedKey(sharedKey: string): Observable<any> {
      return this.httpClient.get(this.endpoint + '/findBySharedKey',
        { params: new HttpParams().set('sharedKey', sharedKey) }
      );
    }

    /** It returns all clients */
    getAll(): Observable<any> {
        return this.httpClient.get(this.endpoint + '/findAll');
    }

    /** It saves a client */
    save(client: ClientModel): Observable<any> {
      return this.httpClient.post(this.endpoint + '/save', client, this.headerJson);
    }


  }
