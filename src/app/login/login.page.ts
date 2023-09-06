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
  usuarioValue: string = ''; // Declarar e inicializar la propiedad

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
    this.route.queryParams.subscribe(params => {
      this.usuarioValue = params['usuarioValue'];
    })
  }

  async validarLogin() {
    if (this.loginForm.valid) {
      const usuario = this.loginForm.value.usuario;
      const contraseña = this.loginForm.value.contraseña;

      if (usuario === 'ADMIN' && contraseña === '0000') {
        this.router.navigate(['/tabs/profile'], {
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
