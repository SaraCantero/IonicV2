import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  cicles2: any;
  contador3= 0;
  name: any;
  surname: any;
  email: any;
  password: any;
  c_password: any;
  cicle_id: any;

  constructor(public restService: RestService, private router:Router, private ac: AlertController) { 
    this.obtenerCiclos();
  }

  ngOnInit() {
  }

  registrarUsuario(){
    this.restService.register(this.name, this.surname, this.email, this.password, this.c_password, this.cicle_id)
    .then(async data => {
      console.log(data);
      if(data){
        this.router.navigateByUrl("/login");
      }else{
        //alert
      }
    })
  }

  obtenerCiclos(){
    this.contador3=0;
    this.restService.getCicles()
    .then((res: any) => {
      this.cicles2=res.data;
      console.log(this.cicles2);
    })
  }
  
  // async alerta(){
  //     const alert = await this.ac.create({
  //     header: 'Se produjo un error',
  //     message: 'Escribe los datos correctamente',
  //     buttons: ['Ok']
  //   });
  //   await alert.present();
  // }
}
