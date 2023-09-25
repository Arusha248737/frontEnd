import { Injectable } from '@angular/core';

import { HttpClient} from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';

@Injectable({

  providedIn: 'root'

})

export class AirlineService {

 

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:8200/api/routes';

  getAirlineDetailsByIATACode(code: string): Observable<any> {

    const url = `${this.apiUrl}/getAirline/${code}`; // Example URL, update accordingly

    return this.http.get<any>(url);

  }

  getAirportByCode(code:string):Observable<any[]>{

    const url = `${this.apiUrl}/getAirport/${code}`; // Example URL, update accordingly

    return this.http.get<any>(url);

  }

 

 

}