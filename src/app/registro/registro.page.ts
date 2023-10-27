import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

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

  constructor(private router: Router, private route: ActivatedRoute, private alertController: AlertController) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.nombreInput = params['nombreInput'];
      this.apellidoInput = params['apellidoInput'];
      this.rutInput = params['rutInput'];
      this.usuarioInput = params['usuarioInput'];
      this.contrasenaInput = params['contrasenaInput'];
      this.confcontrasenaInput = params['confcontrasenaInput'];
    })
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
