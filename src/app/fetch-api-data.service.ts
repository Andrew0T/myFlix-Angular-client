import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://myflixdb-202302.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {

  /**
   *  Inject the HttpClient module to the constructor params
   *  This will provide HttpClient to the entire class, making it available via this.http
   */ 
  constructor(private http: HttpClient) {}
 
  /**
   * Register user
   * @service POST user data via /users endpoint
   * @param userDetails 
   * @returns newly created user object
   * @function userRegistration
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
    .post(apiUrl + 'users', userDetails)
    .pipe(catchError(this.handleError)
    );
  }
  
/**
   * Log in user
   * @service POST user data via /login endpoint
   * @param userDetails 
   * @returns authenticated user object and generated token
   * @function userLogin
   */
  public userLogin(userDetails: any): Observable<any>{
    console.log(userDetails);
    return this.http
    .post(apiUrl + 'login', userDetails)
    .pipe(catchError(this.handleError)
    );
  }

  /**
   * Get all movies data
   * @service GET all movies via /movies endpoint
   * @returns an array of movie objects
   * @function getAllMovies
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies',
      {headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })})
      .pipe(map(this.extractResponseData),
       catchError(this.handleError));
  }

  // Get one movie
  /**
   * @service GET to the respective endpoint of apiUrl to get a movie by title
   * @param Title
   * @returns an array of movie objects in json format
   * @function getMovie
   */
  getMovie(Title: string): Observable<any>{
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl + `movies/${Title}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer' + token,
      })})
    .pipe(map(this.extractResponseData),
    catchError(this.handleError));
  }

  /**
   * Get director data by name
   * @service GET director data via /movies/director/:DirectorName endpoint
   * @param directorName 
   * @returns director object
   * @function getDirector
   */
  getDirector(directorName: string): Observable<any>{
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl + `movies/Director/${directorName} `, {
      headers: new HttpHeaders({
        Authorization: 'Bearer' + token,
      })})
    .pipe(map(this.extractResponseData),
      	catchError(this.handleError));
  }

  /**
   * Get genre data by name
   * @service GET genre data via /movies/genre/:GenreName endpoint 
   * @param genreName 
   * @returns genre object
   * @function getGenre
   */
  getGenre(genreName: string): Observable<any>{
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl + `movies/Genre/${genreName}`, {
      headers: new HttpHeaders({
      Authorization: 'Bearer' + token,
      })})
    .pipe(map(this.extractResponseData),
      catchError(this.handleError));
  }

  /**
   * Get logged in user data
   * @service GET userdata via /users/:Username endpoint
   * @returns logged in user object
   * @function getUsers
   */
  getUser(): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData),
       catchError(this.handleError));
  }

  /**
   * Get user's favourite movies
   * @service GET user's favourite movies via /user/:Username endpoint
   * @returns an array of user's favorite movies
   * @function getFavoriteMovie
   */
  getFavoriteMovie(): Observable<any>{
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
    .get(apiUrl+ `users/${username}/movies`, 
      {headers: new HttpHeaders ({
        Authorization: 'Bearer' + token,
      })})
    .pipe(map(this.extractResponseData),
      map(data => data.FavoriteMovie),
      catchError(this.handleError));
  }

  /**
   * Add movie to user's favourites
   * @service POST a movie to user's favourites via /users/:Username/movies/:MovieId endpoint
   * @param MovieID 
   * @returns updated user object after movie added
   * @function addFavoriteMovie
   */
  addFavoriteMovie(MovieID: string): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
      .post(
        apiUrl + `users/${username}/movies/${MovieID}`,
        { FavoriteMovie: MovieID }, 
        { headers: new HttpHeaders({
          Authorization: 'Bearer ' + token
        })}
      )
      .pipe(map(this.extractResponseData),
       catchError(this.handleError));
  }

  /**
   * Add movie to user's favourites
   * @service POST a movie to user's favourites via /users/:Username/movies/:MovieId endpoint
   * @param MovieID 
   * @returns updated user object after movie added
   * @function deleteFavoriteMovie
   */
  deleteFavoriteMovie(MovieID: string): Observable<any>{
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
       return this.http
    .delete(
      apiUrl + `users/${username}/movies/${MovieID}`,
      {headers: new HttpHeaders({
          Authorization: 'Bearer ' + token
      })}
    )
    .pipe(map(this.extractResponseData),
     catchError(this.handleError));
}

  /**
   * Update user data
   * @service PUT updated user data via /users/:Username endpoint
   * @param updatedUserDetails 
   * @returns updated user object
   * @function editUser
   */
  editUser(updateUser: any): Observable<any>{
    console.log(updateUser);
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
    .put(apiUrl + `users/${username}`, updateUser, {
      headers: new HttpHeaders({
        Authorization: 'Bearer' + token,
      })})
    .pipe(map(this.extractResponseData),
      catchError(this.handleError));
  }

  /**
   * Delete user
   * @service DELETE user data via /users/:Username endpoint
   * @returns message indicating whether the user has successfully deleted
   * @function deleteUser
   */
  deleteUser(): Observable<any>{
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
    .delete(apiUrl + `users/${username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer' + token,
      })})
    .pipe(map(this.extractResponseData),
      catchError(this.handleError));
  }

  /**
   * Extract data from the HTTP response
   * @param response
   * @returns response body or an empty object
   * @function extractResponseData
   * Non-typed response extraction
   */
private extractResponseData(res: any): any {
  const body = res;
  return body || {};
}


  /**
   * Handle API call errors
   * @param error 
   * @returns error message
   * @function handleError
   */
private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}
