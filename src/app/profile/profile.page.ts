import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IonInput, IonSelect } from '@ionic/angular'; // Importa IonSelect

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  usuarioValue: string = "";
  nombre: string = "";
  apellido: string = "";
  nombreInput: string = "";
  apellidoInput: string = "";
  semestreSelect: string = "";

  constructor(private route: ActivatedRoute, private alertController: AlertController) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.usuarioValue = params['usuarioValue'];
      this.nombreInput = params['nombreInput'];
      this.apellidoInput = params['apellidoInput'];
      this.semestreSelect = params['semestreSelect'];
    })
  }

  limpiarCampos() {
    this.nombre = "";
    this.apellido = "";
    this.nombreInput = ''; // Limpia el campo Nombre
    this.apellidoInput = ''; // Limpia el campo Apellido
    this.semestreSelect = ''; // Limpia el ion-select (restablece a su valor predeterminado)
  }

  async guardarDatos() {
    // Puedes mostrar una alerta con los datos ingresados.
    const alert = await this.alertController.create({
      header: 'Datos Guardados',
      message: 'Nombre: ' + this.nombreInput + '\n' +
        'Apellido: ' + this.apellidoInput,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
