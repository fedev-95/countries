import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../models/countries.model';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  
  _http = inject(HttpClient);
  api = 'https://restcountries.com/v3.1';
  responseFilters: string = 'name,population,region,subregion,capital,tld,currencies,languages,borders,flags';

  getAllCountries(): Observable<Country[]> {
    return this._http.get<Country[]>(`${this.api}/all?fields=${this.responseFilters}`);
  }

  searchByName(countryName: string): Observable<Country[]> {
    return this._http.get<Country[]>(`${this.api}/name/${countryName}`);
  }

  getCountryByName(countryName: string): Observable<Country[]> {
    return this._http.get<Country[]>(`${this.api}/name/${countryName}?fullText=true`);
  }

  getCountryByCode(countryCode: string): Observable<Country[]> {
    return this._http.get<Country[]>(`${this.api}/alpha/${countryCode}`);
  }

  // https://restcountries.com/v3.1/region/{region}
  getByRegion(region: string): Observable<Country[]> {
    return this._http.get<Country[]>(`${this.api}/region/${region}`);
  }


}
