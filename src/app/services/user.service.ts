import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userData: any;

  constructor() {}

  setUserData(userData: any): void {
    this.userData = userData;
  }

  getUserData(): any {
    return this.userData;
  }

  isAuthenticated(): boolean {
    return !!this.userData; // Check if user data exists
  }

  clearUserData(): void {
    this.userData = null;
  }
}
