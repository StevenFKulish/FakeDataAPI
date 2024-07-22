import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TopicData } from './interfaces/TopicData';
import { catchError, map, Observable, of } from 'rxjs';
import { TopicComment } from './interfaces/TopicComment';

@Injectable({
  providedIn: 'root'
})
export class DataAPIService {

  baseUrl:string = "https://localhost:7289/";
  //baseUrl:string = "https://fakedataapi20240722100626.azurewebsites.net/";
  azureApi:boolean = false;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }

  get_topics(): Observable<TopicData[]> {
    return this.httpClient.get<TopicData[]>(this.baseUrl + (this.azureApi ? '' : 'api/topic'))
      .pipe(
        map((response: any) => response.topics),
        catchError(this.handleError<TopicData[]>('get_topics', []))
      );
  }

  get_topic_by_id(id: string): Observable<TopicData> {
    return this.httpClient.get<TopicData>(this.baseUrl + (this.azureApi ? '' : 'api/topic/')  + id)
      .pipe(
        map((response: any) => response.topic),
        catchError(this.handleError<TopicData>(`get_topic_by_id id=${id}`))
      );
  }

  get_comments(id: string): Observable<TopicComment[]> {
    return this.httpClient.get<TopicComment[]>(this.baseUrl + (this.azureApi ? '/get-comments/' : 'api/topic/get-comments/')  + id)
      .pipe(
        map((response: any) => response.comments),
        catchError(this.handleError<TopicComment[]>('get_comments', []))
      );
  }

  
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
