import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = ''; 
  password: string = '';
  loginError: boolean = false;


  constructor(
    private http: HttpClient, 
    private router: Router,
    ) {}

  login() {
    const credentials = {
      username: this.username,
      password: this.password
    };

    this.http.post<any>('http://localhost:8080/api/login', credentials).subscribe(
      (response: any) => {
        if (response && response.token) {
          const authToken = response.token;
          const userId = response.id;
          localStorage.setItem('authToken', authToken);
          localStorage.setItem('userId', userId);
          this.router.navigate(['/pets']);
        } else {
          this.loginError = true
        }
      },
      (error) => {
        // Handle login error
        this.loginError = true
      }
    );

  }
}
