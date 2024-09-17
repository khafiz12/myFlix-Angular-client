import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

//Declaring the api url that will provide data for the client app
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {

  apiUrl = "https://top-movies-flix-0061641eb1b3.herokuapp.com";
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

  private getToken(): string {
    return localStorage.getItem('token') || '';
  }

  private getHttpOptions() {
    const token = this.getToken();
    if (!token) {
      console.error('Token not found in localStorage');
    }
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

 // Making the api call for the user registration endpoint
  public userRegistration(userData: any): Observable<any> {
    console.log(userData);
    return this.http.post(`${this.apiUrl}/User`, userData).pipe(
    catchError(this.handleError),
    );
  }

  
  public userLogin(loginData: any): Observable<any> {
    const { Username, Password } = loginData;
    const url = `${this.apiUrl}/login?Username=${encodeURIComponent(Username)}&Password=${encodeURIComponent(Password)}`;

    return this.http.post(url, null).pipe(
      catchError(this.handleError)
    );
  }



  public getAllMovies(): Observable<any> {
    const token =this.getToken();
    return this.http.get( `${this.apiUrl}/movies`, this.getHttpOptions()).pipe(
    catchError(this.handleError)
    );
}

  public getOneMovie(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/movies/id/${id}`, 
      this.getHttpOptions()).pipe(
  catchError(this.handleError)
    );
}

  public getMovie(movieId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/movies/${movieId}`,
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
    return this.http.get(`${this.apiUrl}/User/${username}`,
      this.getHttpOptions()).pipe(
        catchError(this.handleError)
      );
  }

  public getFavoriteMovies(username: string): Observable<any> {
  return this.http.get(`${this.apiUrl}/User/${username}`);
}

  public addFavoriteMovie(username: string, MovieID: string): Observable<any>{
    return this.http.put(`${this.apiUrl}/User/${username}/movies/${MovieID}`, {},{
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`
      })
    });
    }
    
// Add a movie using its ID
    public getMovieById(MovieID: string): Observable<any> {
      return this.http.get(`${this.apiUrl}/movies/id/${MovieID}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${localStorage.getItem('token')}`
        })
      });
    }
    
    // Edit user profile
    public editUser(username: string, updatedData: any): Observable<any> {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found in localStorage');
        return throwError('Token not found');
      }
    
      return this.http.put(`${this.apiUrl}/User/${username}`, JSON.stringify(updatedData), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }),
      }).pipe(
        catchError(this.handleError)
      );
    }


   public updateUserProfile(username: string, userData: any): Observable<any> {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found in localStorage');
        return throwError('Token not found');
      }
    
      return this.http.put(`${this.apiUrl}/User/${username}`, JSON.stringify(userData), {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }),
      }).pipe(
        catchError(this.handleError)
      );
    }

    public deleteUser(username: string): Observable<any> {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found in localStorage');
        return throwError('Token not found');
      }
  
      console.log('Deleting user with username:', username);
      return this.http.delete(`${this.apiUrl}/User/${username}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      }).pipe(
        map((response: any) => {
          console.log('User deleted response:', response);
          return response;
        }),
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