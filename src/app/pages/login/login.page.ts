import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import {AlertController} from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  token: any;
  email: any;
  password:any;
  
  

  constructor(public restService: RestService,private router: Router, private alertCtrl: AlertController) {
    // this.hacerLogin();
   }

  ngOnInit() {
  }

 hacerLogin(){
    this.restService.login(this.email, this.password).then(data => {
      console.log(data);
      this.token = data;
      //Para obtener el token del usuario que se loguea
      this.restService.setToken(this.token.data.token);
      //
      if(data){
        console.log('Login correcto');
        this.router.navigateByUrl('/tabs/tab1');;
        
      }
      // else {
      //   const alert = await this.alertCtrl.create({
      //   header: 'ERROR',
      //   subHeader: 'DATOS INCORRECTOS',
      //   message: 'Los datos introducidos no corresponen a ningun usuario',
      //   buttons: ['OK']
      //   });
      //   await alert.present();
      //  }
 
    });
  }

}
