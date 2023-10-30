import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-error404',
  templateUrl: './error404.page.html',
  styleUrls: ['./error404.page.scss'],
})
export class Error404Page implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  back() {
    if (localStorage.getItem('Cuenta') != null) {
      console.log("Iniciado")
      this.router.navigate(['/qr']);
    }
    else {
      console.log("No Iniciado")
      this.router.navigate(['/']);
    }
  }

}
