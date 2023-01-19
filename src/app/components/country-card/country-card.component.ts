import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Country } from 'src/app/models/countries.model';
import { RouterModule } from '@angular/router';

import { NgOptimizedImage } from '@angular/common'

@Component({
  selector: 'app-country-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgOptimizedImage
  ],
  templateUrl: './country-card.component.html',
  styleUrls: ['./country-card.component.css'],
  host: {'class': 'd-flex'}
})
export class CountryCardComponent {

  @Input() country: Country | undefined;

}
