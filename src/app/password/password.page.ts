import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {
    usuarioInput: string = '';
    contrasenaInput: string = '';
    nuevaContrasenaInput: string = '';
    confNuevaContrasenaInput: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.usuarioInput = params['usuarioInput'];
      this.contrasenaInput = params['contrasenaInput']
      this.nuevaContrasenaInput = params['nuevaContrasenaInput'];
      this.confNuevaContrasenaInput = params['confNuevaContrasenaInput']
    })
  }

  async cambiarContraseña() {
    const cuentaGuardadaString = localStorage.getItem('Cuenta');

    if (cuentaGuardadaString) {
      const cuentaGuardada = JSON.parse(cuentaGuardadaString);

      // Verificar si el usuario existe en el LocalStorage
      if (cuentaGuardada.usuario === this.usuarioInput) {
        // Verificar si la contraseña actual coincide
        if (cuentaGuardada.contrasena === this.contrasenaInput) {
          const nuevaContrasena = this.nuevaContrasenaInput;

          // Validar que la nueva contraseña no sea igual a la contraseña anterior
          if (nuevaContrasena !== this.contrasenaInput) {
            cuentaGuardada.contrasena = nuevaContrasena;
            localStorage.setItem('Cuenta', JSON.stringify(cuentaGuardada));
            console.log("funciona")
            alert('Contraseña cambiada con éxito.');
          } else {
            console.log('no funciona')
            alert('La nueva contraseña debe ser diferente de la contraseña anterior.');
          }
        } else {
          console.log('no funciona')
          alert('La contraseña actual es incorrecta.');
        }
      } else {
        console.log('no funciona')
        alert('El usuario ingresado no coincide con ninguna cuenta.');
      }
    } else {
      console.log('no funciona')
      alert('No se encontró ninguna cuenta en el almacenamiento local.');
    }
  }


}
