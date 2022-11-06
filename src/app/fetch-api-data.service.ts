import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://cinema-spark.herokuapp.com/';

const token = localStorage.getItem('token');
const username = localStorage.getItem('user');

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {

  constructor(private http: HttpClient) { }
  // Making the api call for the user registration endpoint
  /**
   * @service POST to an API endpoint to register a new user
   * @param {any} userData
   * @returns a new user object in json format
   * @function userRegistration
   */
  public userRegistration(userData: any): Observable<any> {
    console.log(userData);
    return this.http.post(apiUrl + 'users', userData).pipe(
      catchError(this.handleError)
    );
  }

  // Making the api call for the user login endpoint
  /**
  * @service POST to an API endpoint to login a user
  * @param {any} userDetails
  * @returns a user object in json format
  * @function userLogin
  * @returns
  */
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  //Get all movies
  /**
   * @service GET to an API endpoint to get all movies
   * @returns an array of all movies in json format
   * @function getAllMovies
   */
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `movies`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //Get one movie endpoint
  /**
  * @service GET to an API endpoint to get a movie by title
  * @param {string} Title
  * @returns a an array of movie objects in json format
  * @function getMovies
  */
  public getMovies(Title: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `movies/${Title}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //Get director
  public getDirector(directorName: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `movies/director/${directorName}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //Get genre
  /**
  * @service GET to an API endpoint to get genre info
  * @param {string} genreName
  * @returns a an array of movie objects in json format
  * @function getGenre
  */
  public getGenre(genreName: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `movies/genre/${genreName}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //Get user and get favorite movies of a user
  /**
  * @service GET to an API endpoint to get a specific user
  * @param {string} user
  * @returns a user object in json format
  * @function getUser
  */
  public getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .get(apiUrl + `users/${user}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Get favourite movies for a user
  /**
  * @service GET to an API endpoint to get a specific user's favorite movies
  * @param {string} user
  * @returns a user object in json format
  * @function getFavoriteMovies
  */
  getFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .get(apiUrl + `users/${user}/movies`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  //Add a movie to favorite Movies
  /**
   * @service POST to an API endpoint to add a movie to a user's favorites list
   * @returns a user object in json format
   * @function addFavoriteMovie
   */
  addFavoriteMovie(movieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    // Get username from localStorage for URLs
    const user = localStorage.getItem('user');
    return this.http
      .post(apiUrl + `users/${user}/movies/${movieID}`, { FavoriteMovies: movieID }, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Edit user
  /**
  * @service PUT to an API endpoint to edit/update a user's details
  * @returns a user object in json format
  * @function editUser
  */
  public editUser(updateDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    // Get username from localStorage for URLs
    const user = localStorage.getItem('user');
    return this.http
      .put(apiUrl + `users/${user}`, updateDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token
        })
      })
  }

  // Delete user
  /**
  * @service DELETE to an API endpoint to delete a user
  * @returns success message
  * @function deleteUser
  */
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + `users/${user}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //Delete a movie from the favourite movies
  /**
  * @service DELETE to an API endpoint to remove a movie from a user's favorites list
  * @returns a user object in json format
  * @function removeFavoriteMovie
  */
  removeFavoriteMovie(movieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + `users/${user}/movies/${movieID}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  /**
  * handles errors
  * @param error
  * @returns error message
  */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.log(error);
      console.error(
        `Error Status code ${error.status}, Error body is: ${error.error}`
      );
      console.table(error);
    }
    return throwError(
      'Something bad happened; please try again later.'
    );
  }
}
