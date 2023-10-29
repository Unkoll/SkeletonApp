import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  usuarioRegistrado: any;

  imagenes:any[]=[];

  constructor(private router: Router, private route: ActivatedRoute, private alertController: AlertController) { }

  ngOnInit() {
    defineCustomElements(window);

    this.route.queryParams.subscribe(params => {

    })

    const usuarioGuardado = localStorage.getItem('Cuenta');
    if (usuarioGuardado) {
      this.usuarioRegistrado = JSON.parse(usuarioGuardado);
    }
  }

  async takePhoto(){

    var cSourse = CameraSource.Prompt;

    if ((await Camera.checkPermissions()).camera == 'granted') {
      const image = await Camera.getPhoto(
        {
          resultType:CameraResultType.Uri,
          quality:100,
          height:1024,
          width:1024,
          source:cSourse,
          presentationStyle:'popover',
          promptLabelCancel:"Cancelar",
          promptLabelHeader:"Seleccione",
          promptLabelPhoto:"Desde la galeria",
          promptLabelPicture:"Desde la camara"
        }
        );

        if (image.webPath) {
          var blob = (await fetch(image.webPath)).blob();
          this.imagenes.unshift({fname:'foto.'+ image.format,src:image.webPath,file:blob});

          var src = image.webPath;

          this.usuarioRegistrado.foto = src;
        }

        console.log("IMAGENES GUARDADAS ===> ", this.imagenes);


        localStorage.setItem("Cuenta", JSON.stringify(this.usuarioRegistrado));

    }
  }

  logout(){
    localStorage.removeItem("Cuenta")
    this.router.navigate(['/']);
  }

}

