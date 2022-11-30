import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashboardClient {
  constructor(
    private http: HttpClient
    ) {}

  getDashboardData(): Observable<any> {
    return this.http.get(environment.apiUrl + 'api/dashboard');
  }
}
