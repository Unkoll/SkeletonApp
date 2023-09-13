import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuarioValue: string = '';
  contrasenaValue: string = '';

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      contraseña: ['', Validators.required]
    });
  }

  ngOnInit() {
    const localData = localStorage.getItem('cuenta');
    if (localData != null) {
      console.log("entra");
    }
    this.route.queryParams.subscribe(params => {
    })
  }



  Login() {
    const usuarioControl = this.loginForm.get('usuario');
    const contrasenaControl = this.loginForm.get('contraseña');

    if (usuarioControl && contrasenaControl) {
      const usuarioIngresado = usuarioControl.value;
      const contrasenaIngresada = contrasenaControl.value;

      const cuentaGuardadaString = localStorage.getItem('Cuenta');

      if (cuentaGuardadaString) {
        const cuentaGuardada = JSON.parse(cuentaGuardadaString);

        if (cuentaGuardada && cuentaGuardada.usuario === usuarioIngresado && cuentaGuardada.contrasena === contrasenaIngresada) {
          this.router.navigate(['/qr', { usuario: usuarioIngresado }]);
        } else {
          alert('Usuario o contraseña incorrectos');
        }
      } else {
        alert('No se encontraron credenciales almacenadas');
      }
    } else {
      alert('Error: Los campos del formulario no están disponibles');
    }
  }
}
