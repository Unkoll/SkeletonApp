import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {
    correoInput: string = '';
    contrasenaInput: string = '';
    confcontrasenaInput: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.correoInput = params['correoInput'];
      this.contrasenaInput = params['contrasenaInput'];
      this.confcontrasenaInput = params['confcontrasenaInput']
    })
  }

  async cambiarContraseña() {
    // Obtener el valor del correo electrónico ingresado por el usuario
    const correo = this.correoInput

    // // Verificar si el correo electrónico existe en el LocalStorage
    // const storedCuenta = JSON.parse(localStorage.getItem('cuenta'));
    // if (storedData && storedData.email === email) {
    //   // Obtener la nueva contraseña ingresada por el usuario
    //   const newPassword = document.getElementById('newPasswordInput').value;

    //   // Verificar si la contraseña y la confirmación coinciden
    //   const confirmNewPassword = document.getElementById('confirmNewPasswordInput').value;
    //   if (newPassword === confirmNewPassword) {
    //     // Modificar la contraseña en el almacenamiento local
    //     storedData.password = newPassword;
    //     localStorage.setItem('userData', JSON.stringify(storedData));
    //     alert('Contraseña cambiada con éxito.');
    //   } else {
    //     alert('La contraseña y la confirmación no coinciden.');
    //   }
    // } else {
    //   alert('El correo electrónico ingresado no coincide con ninguna cuenta.');
    // }
  }


}
