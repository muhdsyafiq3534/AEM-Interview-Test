import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationClient } from '../clients/authentication.client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'token';

  constructor(
    private authenticationClient: AuthenticationClient,
    private router: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) { }

  public login(username: string, password: string): void {
    this.authenticationClient.login(username, password).subscribe((token) => {
      localStorage.setItem(this.tokenKey, token.replaceAll('"', ''));
      this.router.navigate(['/dashboard']);
    }, error => {
       this.snackBar.open("Invalid Email and Password", "OK", { duration: 10000 });
    });
  }

  public logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    let token = localStorage.getItem(this.tokenKey);
    return token != null && token.length > 0;
  }

  public getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) : null;
  }

}
