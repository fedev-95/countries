import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesService } from 'src/app/services/countries.service';
import { Country } from 'src/app/models/countries.model';
import { debounceTime, Subscription } from 'rxjs';
import { CountryCardComponent } from "../country-card/country-card.component";
import { Router, RouterModule } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from "../loading/loading.component";

@Component({
    selector: 'app-home-page',
    standalone: true,
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css'],
    host: { 'class': 'flex-grow-1 d-flex' },
    imports: [
      CommonModule,
      CountryCardComponent,
      RouterModule,
      ReactiveFormsModule,
      LoadingComponent,
    ]
})
export class HomePageComponent implements OnInit, OnDestroy {

  loading: boolean | undefined;
  searchTerm = new FormControl();
  _router = inject(Router);
  regionFilter: string | undefined;
  _countriesService = inject(CountriesService);
  countries: Country[] | undefined;
  countriesSubscription: Subscription = new Subscription();
  
  ngOnInit(): void {
    this.searchTermChange();
    this.getAllCountries();
  }

  getAllCountries(): void {
    this.loading = true;
    this.countriesSubscription = this._countriesService.getAllCountries().subscribe({
      next: (res: Country[]) => {
        this.countries = res;
      },
      error: (error) => console.log(error),
      complete: () => {
        this.regionFilter = undefined;
        this.loading = false;
      }
    });
  }

  searchTermChange() {
    this.countriesSubscription = this.searchTerm.valueChanges.pipe(debounceTime(500)).subscribe( param => {
      if (param) {
        this.searchByName(param);
      } else {
        this.getAllCountries();
      }
    })
  }

  searchByName(countryName: string): void {
    this.loading = true;
    this.countriesSubscription = this._countriesService.searchByName(countryName).subscribe({
      next: (res: Country[]) => {
        this.countries = res;
      },
      error: (error) => {
        if (error.status === 404) {
          this.countries = undefined;
          this.loading = false;
        }
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  getByRegion(region: string): void {
    this.loading = true;
    this.countriesSubscription = this._countriesService.getByRegion(region).subscribe({
      next: (res: Country[]) => {
        this.countries = res;
      },
      error: (error) => {
        if (error.status === 404) {
          this.countries = undefined;
          this.loading = false;
        }
      },
      complete: () => {
        this.regionFilter = region;
        this.loading = false;
      }
    });
  }
  
  ngOnDestroy(): void {
    this.countriesSubscription.unsubscribe();
  }

}