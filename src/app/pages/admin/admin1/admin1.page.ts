import { Component, OnInit } from '@angular/core';
import { RestService } from '../../../services/rest.service';
import { Users } from 'src/app/interfaces/users';

@Component({
  selector: 'app-admin1',
  templateUrl: './admin1.page.html',
  styleUrls: ['./admin1.page.scss'],
})
export class Admin1Page {

   usuarios: Users[];

 
   constructor(public restService: RestService,) {
     this.obtenerUsuarios();
  
   }
     obtenerUsuarios(){
     this.restService.getUsuarios()
       .then((res: any) => {
         if(res.success){
         this.usuarios=res.data;
         console.log(this.usuarios);
       }
    },
      (error)=>{
        console.error(error);
      }
    );

    }
      }

    
  
 