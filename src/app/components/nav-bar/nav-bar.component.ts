import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateService } from 'src/app/services/state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {
  
  _stateService = inject(StateService);
  darkModeSubscription: Subscription = new Subscription();
  darkMode$: boolean | undefined;
  
  ngOnInit(): void {
    this.setDarkModeSubscription();
  }
  
  toggleTheme() {
    this._stateService.toggleTheme(true);
  }
  
  setDarkModeSubscription(): void {
    this.darkModeSubscription = this._stateService.darkMode$.subscribe({
      next: (res: boolean) => {
        if (res) {
          this.darkMode$ = true;
        } else {
          this.darkMode$ = false;
        }
      }
    });
  }
  
  ngOnDestroy(): void {
    this.darkModeSubscription.unsubscribe();
  }

}