import { Component, OnInit } from '@angular/core';
import { RestService } from '../../../services/rest.service';
import { Users } from 'src/app/interfaces/users';

@Component({
  selector: 'app-admin1',
  templateUrl: './admin1.page.html',
  styleUrls: ['./admin1.page.scss'],
})
export class Admin1Page {

   usuarios: any;
  //  user_id=this.restService.getUserId();
  

 
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
    Activate(valor:any){
      this.restService.activarUser(valor)
      .then((res:any)=>
    {if(res.success){
     console.log(res);
     this.obtenerUsuarios();
    }
  },
      (error)=>{
        console.error(error);
      }
      );
      }
    }
      
    

    
  
 