import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import { Comuna } from 'src/app/models/comuna';
import { Region } from 'src/app/models/region';
import { HelperService } from 'src/app/services/helper.service';
import { LocationService } from 'src/app/services/location.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  nombreInput: string = "";
  apellidoInput: string = "";
  rutInput: string ="";
  usuarioInput: string = "";
  contrasenaInput: string = "";
  confcontrasenaInput: string = "";
  foto: any;

  regiones:Region[]=[];
  comunas:Comuna[]=[];
  regionSel:number = 0;
  comunaSel:number = 0;
  seleccionComuna:boolean = true;

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private alertController: AlertController,
      private storage:StorageService,
      private helper:HelperService,
      private locationService:LocationService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.nombreInput = params['nombreInput'];
      this.apellidoInput = params['apellidoInput'];
      this.rutInput = params['rutInput'];
      this.usuarioInput = params['usuarioInput'];
      this.contrasenaInput = params['contrasenaInput'];
      this.confcontrasenaInput = params['confcontrasenaInput'];

      this.cargarRegion();
    })
  }

  async cargarRegion(){
    const req = await this.locationService.getRegion();
    this.regiones = req.data;
  }

  async cargarComuna(){
    this.seleccionComuna = false;
    const req = await this.locationService.getComuna(this.regionSel);
    this.comunas = req.data;
  }



  limpiarCampos() {
    this.nombreInput = '';
    this.apellidoInput = '';
    this.rutInput = '';
    this.usuarioInput = '';
    this.contrasenaInput = '';
    this.confcontrasenaInput = '';
  }

  async guardarDatos() {

    if (this.contrasenaInput === this.confcontrasenaInput && this.contrasenaInput != null) {

      let cuenta = {
        nombre: this.nombreInput,
        apellido: this.apellidoInput,
        rut: this.rutInput,
        usuario: this.usuarioInput,
        contrasena: this.contrasenaInput,
        foto: ""
      }

      localStorage.setItem("Cuenta", JSON.stringify(cuenta))

      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'Su cuenta ha sido creada.',
        buttons: ['Aceptar']
      });
      await alert.present();

      this.router.navigate(['/login'])
    }
    else{
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Las contraseñas no coinciden.',
        buttons: ['Aceptar']
      });
      await alert.present();
    }

  }

  contrasenaVisible: boolean = false;

  toggleContrasenaVisibility() {
    this.contrasenaVisible = !this.contrasenaVisible;
  }


}
