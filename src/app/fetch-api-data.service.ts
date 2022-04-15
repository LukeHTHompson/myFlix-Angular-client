import { Injectable } from '@angular/core';
// import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { map } from 'rxjs/operators';

// Declare the API URL that will supply data to the app
const apiUrl = 'https://lht-my-cinema.herokuapp.com/'
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  // Providing an imported module to constructor allows anything invoking this class to use that module (via this.http in this case)
  constructor(private http: HttpClient) { }

  // This is the API call to create a new user
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(catchError(this.handleError))
  }

  userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    console.log(userDetails.Username);
    console.log(userDetails.Password);
    return this.http.post(apiUrl + 'login' + `?Username=${userDetails.Username}` + `&Password=${userDetails.Password}`, '').pipe(catchError(this.handleError))
  }

  userEdit(userDetails: any, newDetails: any): Observable<any> {
    console.log(userDetails);
    console.log(newDetails);
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + userDetails.Username, newDetails, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(catchError(this.handleError))
  }

  userDelete(userDetails: any): Observable<any> {
    console.log(userDetails);
    console.log(userDetails.Username);
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + userDetails.Username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(catchError(this.handleError))
  }

  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<Response>(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getMovie(title: string | null): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<Response>(apiUrl + 'movies/' + title, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getDirector(name: string | null): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<Response>(apiUrl + 'directors/' + name, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getGenre(name: string | null): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<Response>(apiUrl + 'genres/' + name, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Should this give less info than all of the discretely tracked aspects of each user?
  getUser(name: string | null): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<Response>(apiUrl + 'users/' + name, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // How to return only response.body.FavoriteMovies?
  getFavMovies(name: string | null): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<Response>(apiUrl + 'users/' + name, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  addFavMovie(userDetails: any, movieID: string | null): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post<Response>(apiUrl + 'users/' + userDetails.Username + '/favorites/' + movieID, '', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  removeFavMovie(userDetails: any, movieID: string | null): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete<Response>(apiUrl + 'users/' + userDetails.Username + '/favorites/' + movieID, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Non-typed response extraction
  private extractResponseData(res: Response): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message)
    } else {
      console.error(
        `Error Status Code ${error.status} ` +
        `Error Body is: ${error.error}`
      )
    }
    return throwError('Something bad happened; please try again later.')
  }
}
