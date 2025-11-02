import { Injectable } from '@angular/core';
import { Environment } from '../app/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const GC_API = Environment.GC_API;
const routes = {
  getUsers: () => GC_API + `User/GetUsers`,
  getPlayers: () => GC_API + `Player/GetPlayers`,
  savePlayers: () => GC_API + `Player/SavePlayers`,
};
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  getUsers(): Observable<any> {
    return this.http.get<any[]>(routes.getUsers());
    //.pipe(map((response) => response));
  }
  gertPlayers(): Observable<any[]> {
    return this.http.get<any[]>(routes.getPlayers()).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  savePlayers(data: any): Observable<any> {
    return this.http.post<any>(routes.savePlayers(), data);
    //.pipe(map((response) => response));
  }
}
