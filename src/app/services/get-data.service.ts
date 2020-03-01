import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { ITreasure } from '../dataModel';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
 public apiUrl: string;
  constructor(private http: HttpClient) { this.apiUrl = './assets/db.json'; }

  public getData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
