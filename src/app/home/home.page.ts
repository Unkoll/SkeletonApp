import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../services';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  informacionQR: string = '';
  usuarioRegistrado: any;

  constructor(private route: ActivatedRoute, private placesServices: PlacesService) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['informacionQR']) { 
        this.informacionQR = params['informacionQR'];
      }
    });

    const usuarioGuardado = localStorage.getItem('Cuenta');
    if (usuarioGuardado) {
      this.usuarioRegistrado = JSON.parse(usuarioGuardado);
    }
  }
}