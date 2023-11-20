import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.page.html',
  styleUrls: ['./error404.page.scss'],
})
export class Error404Page implements OnInit {

  loggedIn = localStorage.getItem('isLogged')

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    console.log("valor al iniciar 404:",this.loggedIn)
  }

  back() {
    if (this.loggedIn == "true") {
      console.log("logged in")
      this.router.navigate(['/qr']);
    }
    else {
      console.log("not logged in")
      this.router.navigate(['/']);
    }
  }

}
