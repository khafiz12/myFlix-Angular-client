import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {

  apiUrl = "https://top-movies-flix-0061641eb1b3.herokuapp.com/movies";
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

  private getToken(): string {
    return localStorage.getItem('token') || '';
  }

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`
      })
    };
  }

 // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(`${this.apiUrl}/users`, userDetails).pipe(
    catchError(this.handleError)
    );
  }

  public userLogin (userDetails: any): Observable<any> {
    console.log(userDetails)
    return this.http.post(`${this.apiUrl}/login`, userDetails).pipe(
      catchError(this.handleError)
    );
  }


  public getAllMovies(): Observable<any> {
    const token =this.getToken();
    return this.http.get( `${this.apiUrl}/movies`, this.getHttpOptions()).pipe(
    catchError(this.handleError)
    );
}

  public getOneMovie(movieId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}movies/${movieId}`, 
      this.getHttpOptions()).pipe(
  catchError(this.handleError)
    );
}

  public getMovie(movieId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}movies/${movieId}`,
      this.getHttpOptions()).pipe(
        catchError(this.handleError)
      );
  }

  public getDirector(directorName: string): Observable<any>{
    return this.http.get(`${this.apiUrl}directors/${directorName}`,
      this.getHttpOptions()).pipe(
        catchError(this.handleError)
      );
  }

  public getGenre(genreName: string): Observable<any>{
    return this.http.get(`${this.apiUrl}genres/${genreName}`, 
      this.getHttpOptions()).pipe(
        catchError(this.handleError)
      );
  }

  public getUser(username: string): Observable<any>{
    return this.http.get(`${this.apiUrl}users/${username}`,
      this.getHttpOptions()).pipe(
        catchError(this.handleError)
      );
  }

  public getFavoriteMovies(username: string): Observable<any>{
    return this.http.get(`${this.apiUrl}users/${username}/movies`,
      this.getHttpOptions()).pipe(
        catchError(this.handleError)
      );
  }

  public addFavoriteMovie(username: string, movieId: string): Observable<any>{
    return this.http.post(`${this.apiUrl}users/${username}/movies/${movieId}`, {},
      this.getHttpOptions()).pipe(
      catchError(this.handleError)
    ); 
  }

  public editUser(username: string, userDetails: any): Observable<any>{
    return this.http.put(`${this.apiUrl}users/${username}`, userDetails,
      this.getHttpOptions()).pipe(
        catchError(this.handleError)
      ); 
  }

  public deleteUser(username: string): Observable<any>{
    return this.http.delete(`${this.apiUrl}users/${username}`,
      this.getHttpOptions()).pipe(
        catchError(this.handleError)
      ); 
  }

  public deleteFavoriteMovie(username: string, movieId: string): Observable<any>{
    return this.http.delete(`${this.apiUrl}users/${username}/movies/${movieId}`,
      this.getHttpOptions()).pipe(
        catchError(this.handleError)
      );
  }

private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}