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
      this.usuarioValue = params['usuarioValue'];
      this.contrasenaValue = params['contrasenaValue'];
    })
  }



  async Login() {
    if (this.loginForm.valid) {
      const usuario = this.loginForm.value.usuario;
      const contraseña = this.loginForm.value.contraseña;

      if (usuario === 'ADMIN' && contraseña === '0000') {
        this.router.navigate(['/home'], {
          queryParams: { usuarioValue: this.usuarioValue }
        });
      } else {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Usuario o contraseña incorrectos.',
          buttons: ['Aceptar']
        });
        await alert.present();
      }
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, ingresa usuario y contraseña.',
        buttons: ['Aceptar']
      });

      await alert.present();
    }
  }
}
