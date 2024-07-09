import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:3000/api/events';

  constructor(private http: HttpClient) { }

  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getEventById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createEvent(eventData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, eventData);
  }

  shareEvent(id: string): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/${id}/share`);
  }

  updateEvent(eventData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${eventData.id}`, eventData);
  }
}
