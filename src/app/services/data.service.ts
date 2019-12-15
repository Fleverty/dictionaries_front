import { Injectable } from "@angular/core";
import { Country } from 'src/abstractions/country.js';
import { Club } from 'src/abstractions/club.js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class DataService {
  private readonly baseUrl: string = `http://localhost:4000/api`;
  private readonly baseUrlCountry: string = `${this.baseUrl}/country`;
  private readonly baseUrlClub: string = `${this.baseUrl}/club`;
  private readonly headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private readonly httpClient: HttpClient) { }

  public getCountries(): Observable<Country[]> {
    return this.httpClient.get<Country[]>(this.baseUrlCountry);
  }

  public getClubs(): Observable<Club[]> {
    return this.httpClient.get<Club[]>(this.baseUrlClub);
  }

  public getCountry(id: string): Observable<Country> {
    return this.httpClient.get<Country>(`${this.baseUrlCountry}/read/${id}`, { headers: this.headers });
  }

  public getClub(id: string): Observable<Club> {
    return this.httpClient.get<Club>(`${this.baseUrlClub}/read/${id}`, { headers: this.headers });
  }

  public addCountry(country: Country): Observable<void> {
    return this.httpClient.post<void>(`${this.baseUrlCountry}/create`, country)
  }

  public addClub(club: Club): Observable<void> {
    return this.httpClient.post<void>(`${this.baseUrlClub}/create`, club)
  }

  public editCountry(country: Country): Observable<void> {
    return this.httpClient.put<void>(`${this.baseUrlCountry}/update/${country._id}`, country)
  }

  public editClub(club: Club): Observable<void> {
    return this.httpClient.put<void>(`${this.baseUrlClub}/update/${club._id}`, club)
  }

  public deleteCountry(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrlCountry}/delete/${id}`)
  }

  public deleteClub(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrlClub}/delete/${id}`)
  }

}
