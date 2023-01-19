import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  darkMode = new BehaviorSubject<string>(localStorage.getItem('darkMode') || 'false');
  darkMode$ = this.darkMode.asObservable();

  toggleTheme(req?: boolean) {
    if (!localStorage.getItem('darkMode') || localStorage.getItem('darkMode') === 'false') {
      localStorage.setItem('darkMode', 'true');
      this.darkMode.next('true');
    } else if (localStorage.getItem('darkMode') === 'true' && req) {
      localStorage.setItem('darkMode', 'false');
      this.darkMode.next('false');
    }
    document.body.classList.toggle('dark-theme');
  }
  
}
