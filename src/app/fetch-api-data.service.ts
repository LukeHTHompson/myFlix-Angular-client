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

/**
 * This class is used to house all of the functions which interact with the myCinema API.
 */
export class UserRegistrationService {

  // Providing an imported module to constructor allows anything invoking this class to use that module (via this.http in this case)
  constructor(private http: HttpClient) { }

  /**
   * Function uses the API to create a user with the passed in details. Does not require Auth Token.
   * @param userDetails Defines the Username, Password, Email and Birthday of the user to be created. 
   * This parameter should be an Object with the structure:
   * ```
   * userDetails = {
   * Username: ...,
   * Password: ...,
   * Email: ...,
   * Birthday: ...
   * }
   * ```
   * @returns Function will return either an error message, or an object containing the user information of the created user as JSON.
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails).pipe(catchError(this.handleError))
  }

  /**
   * Function uses the API to log in the passed in user. Does not require Auth Token.
   * @param userDetails Defines the Username and Password used to attempt login.
   * This parameter should be an Object with the structure:
   * ```
   * userDetails = {
   * Username: ...,
   * Password: ...
   * }
   * ```
   * @returns Function will return either an error message, or an object containing the Username and Auth Token of the logged in user as JSON.
   */
  userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login' + `?Username=${userDetails.Username}` + `&Password=${userDetails.Password}`, '').pipe(catchError(this.handleError))
  }

  /**
   * Function uses the API to edit details of a given user. Requires Auth Token.
   * @param userDetails Defines the user whose information should be edited.
   * This parameter should be an Object with the structure:
   * ```
   * userDetails = {
   * Username: ...
   * }
   * ```
   * @param newDetails Defines the new information that should be associated with the specified user.
   * This parameter should be an Object with the structure:
   * ```
   * userDetails = {
   * Username: ...,
   * Password: ...,
   * Email: ...,
   * Birthday: ...
   * }
   * ```
   * @returns Function will return either an error message, or an object containing the updated information for the specified user as JSON.
   */
  userEdit(userDetails: any, newDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put<Response>(apiUrl + 'users/' + userDetails.Username, newDetails, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Function uses the API to delete a specified user's account. Requires Auth Token.
   * @param userDetails Defines the Username and Password of the user account to delete.
   * This parameter should be an Object with the structure:
   * ```
   * userDetails = {
   * Username: ...,
   * Password: ...
   * }
   * ```
   * @returns Function will return either an error message, or a message confirming the deletion of the specified account.
   */
  userDelete(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + userDetails.Username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(catchError(this.handleError))
  }

  /**
   * Function uses the API to pull information on all movies existing in the database. Requires Auth Token.
   * @returns Function will return either an error message, or an object containing all database movies and their discrete data as JSON.
   */
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

  /**
   * Function uses the API to pull information on a single movie from the database. Requires Auth Token.
   * @param title Defines the title of the movie to be returned.
   * This parameter should be a string matching the database's title for the desired movie.
   * (Discrete data for all movies can be checked through use of the getAllMovies() function.)
   * @returns Function will return either an error message, or an object containing a single database movie and its discrete data as JSON.
   */
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

  /**
   * Function uses the API to pull information on a single director from the database. Requires Auth Token.
   * @param name Defines the name of the director to be returned.
   * This parameter should be a string matching the database's name for the desired director.
   * (Discrete data for all movies can be checked through use of the getAllMovies() function. This information includes director names.)
   * @returns Function will return either an error message, or an object containing the director and related discrete data as JSON.
   */
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

  /**
   * Function uses the API to pull information for a single genre from the database. Requires Auth Token.
   * @param name Defines the name of the director to be returned.
   * This parameter should be a string matching the database's name for the desired genre.
   * (Discrete data for all movies can be checked through use of the getAllMovies() function. This information includes genre names.)
   * @returns Function will return either an error message, or an object containing the genre and related discrete data as JSON.
   */
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

  /**
   * Function uses the API to pull information for a single users from the database. Requires Auth Token.
   * @param name Defines the username of the user to be returned.
   * This parameter should be a string matching the database's Username for the desired user.
   * @returns Function will return either an error message, or an object containing the user and related discrete data as JSON.
   */
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

  /**
   * Functionally identical to getUser() as this currently returns all discrete data for a user.
   * May be edited in the future to return only a user's favorite movie array.
   * Function uses the API to pull information for a single users from the database. Requires Auth Token.
   * @param name Defines the username of the user to be returned.
   * This parameter should be a string matching the database's Username for the desired user.
   * @returns Function will return either an error message, or an object containing the user and related discrete data as JSON.
   */
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

  /**
   * Function uses the API to add a movie to the favorite's list for a single users from the database. Requires Auth Token.
   * @param userDetails Defines the Username of the user to add a favorite movie for.
   * This parameter should be an Object with the structure:
   * ```
   * userDetails = {
   * Username: ...
   * }
   * ```
   * @param movieID Defines the movie to be added to the favorites list.
   * This parameter should be a string matching the database's '_id' for the movie to be added.
   * (Discrete data for all movies can be checked through use of the getAllMovies() function)
   * @returns Function will return either an error message, or an object containing the user and related discrete data, including Favorite Movie list as JSON.
   */
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

  /**
   * Function uses the API to remove a movie to the favorite's list for a single users from the database. Requires Auth Token.
   * @param userDetails Defines the Username of the user to remove a favorite movie for
   * This parameter should be an Object with the structure:
   * ```
   * userDetails = {
   * Username: ...
   * }
   * ```
   * @param movieID Defines the movie to be removed from the favorites list.
   * This parameter should be a string matching the database's '_id' for the movie to be added.
   * (Discrete data for all movies can be checked through use of the getAllMovies() function)
   * @returns Function will return either an error message, or an object containing the user and related discrete data, including Favorite Movie list as JSON.
   */
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

  /**
   * Function is used to render API call responses.
   * @param res Defines the response from the API.
   * @returns Function will return the response from the API.
   */
  private extractResponseData(res: Response): any {
    const body = res;
    return body || {};
  }

  /**
   * Function is used to display error information in console when errors occur.
   * @param error Defines the error that was encountered.
   * @returns Function returns console error message with information about the error encountered.
   */
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
