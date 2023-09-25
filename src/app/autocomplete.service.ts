import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';

 

@Injectable({

  providedIn: 'root'

})

export class AutocompleteService {

  private apiUrl = 'http://localhost:8200/api/routes';

 

  constructor(private http: HttpClient) { }

 

 autocompleteAirports(searchString: string): Observable<any> {

  // return this.http.post(`${this.apiUrl}/autocomplete`, { searchString }).pipe(

  //   catchError((error) => {

  //     console.error('Error:', error);

  //     return throwError(error); // Rethrow the error

  //   })

  // );

 

    const url = `${this.apiUrl}/autocomplete`;

    const headers = new HttpHeaders({

      'Content-Type': 'application/json'

    });

 

    // Create an object with the search_string property

    const requestData = { search_string: searchString };

 

    return this.http.post<any[]>(url, requestData, { headers });

  }

 

}