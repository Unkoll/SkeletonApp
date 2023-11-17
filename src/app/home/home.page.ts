import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  informacionQR: string = '';
  usuarioRegistrado: any;
  latitud: string | undefined;
  longitud: string | undefined;


  constructor(private route: ActivatedRoute) {}

  async ngOnInit() {

    await this.obtenerUbicacion();

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
  obtenerUbicacion() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitud = position.coords.latitude.toString();
        this.longitud = position.coords.longitude.toString();
      });
    }
  }

  // Función para convertir coordenadas decimales a DMM
  convertirADMM(coordenada: number): string {
    const grados = Math.floor(coordenada);
    const minutosDecimal = (coordenada - grados) * 60;
    const minutos = minutosDecimal.toFixed(4);
    return `${grados}° ${minutos}'`;
  }

}