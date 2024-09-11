import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:5000/api/events';

  constructor(private http: HttpClient) { }

  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/`);
  }

  getEventById(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer token',
      'Content-Type': 'application/json'
    });

    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers });
  }

  createEvent(eventData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer token',
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.apiUrl}/`, eventData, { headers });
  }

  shareEvent(id: string): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/${id}/share`);
  }

  updateEvent(eventData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${eventData.id}`, eventData);
  }

  deleteEvent(eventId: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer token',
      'Content-Type': 'application/json'
    });

    return this.http.delete<any>(`${this.apiUrl}/${eventId}`, { headers });
  }
}
