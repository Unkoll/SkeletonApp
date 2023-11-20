// auth.service.ts

import { Injectable } from '@angular/core';

// auth.service.ts

// auth.service.ts

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private storageKey = 'loggedInState';

  get isLoggedIn(): boolean {
    const storedValue = localStorage.getItem(this.storageKey);
    return storedValue ? JSON.parse(storedValue) : false;
  }

  login() {
    localStorage.setItem(this.storageKey, 'true');
  }

  logout() {
    localStorage.setItem(this.storageKey, 'false');
  }
}
