import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ModalController } from "@ionic/angular";
import { OfferComponent } from "../components/offer/offer.component";
//import { registerLocaleData } from "@angular/common";
//import { resolve } from "dns";
import { RespuestaTopHeadlines } from '../interfaces/news';

const headers = new HttpHeaders;
@Injectable({
  providedIn: "root",
})
export class RestService {
  
  headlinesPage=0;
  apiUrl = "https://allsites.es/sales_in_api/public/api";
  token: any;
  tokenLogin: any; //Recibe el token del metodo login
  ofertaId: any;
  userId: any;
  cicleUser: any;
  cicleIdFoto: any;
  type="client";
  imagesOffers=[];
 

  constructor(private http: HttpClient, private modalCtrl: ModalController) {}

  //Metodos

  private ejecutarQuery<T>(query: string) {
    query = this.apiUrl + query;

    return this.http.get<T>(query, { headers });
  }

  // getTopHeadlines() {
  //   this.headlinesPage++;
  //   return this.ejecutarQuery<RespuestaTopHeadlines>
  //   (`/top-headlines?country=us&page=${this.headlinesPage}`);
  // }

  getUsuarios(){
    return new Promise((resolve) => {
      this.http.get(this.apiUrl +"/users", {
        headers: new HttpHeaders().set('Authorization','Bearer ' + this.tokenLogin),
      }).subscribe(
        (data)=>{
          console.log(data);
          resolve(data);
        },
        (err) =>{
          console.log(err);
        }
      );
      });
    
    }

  getArticles() {
    return new Promise((resolve) => {
      this.http.get(this.apiUrl + "/articles", {}).subscribe(
        (data) => {
          console.log(data);
          resolve(data);
         
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }

  getAllOffers() {
    return new Promise<any>((resolve) => {
      this.http.get(this.apiUrl + "/offers", { 
        headers: new HttpHeaders().set('Authorization','Bearer ' + this.tokenLogin),
      }).subscribe(
        (data) => {
          resolve(data);
        },
        (err) => {
          console.log(err)
        }
      );
    });

  }

  getOffers() {
    return new Promise<any>((resolve) => {
      this.http.get(this.apiUrl + "/offersNotApplied/"+this.userId, { 
        headers: new HttpHeaders().set('Authorization','Bearer ' + this.tokenLogin),
      }).subscribe(
        (data) => {
          resolve(data);
        },
        (err) => {
          console.log(err)
        }
      );
    });

  }

  getCicles(){
    return new Promise<any>((resolve) => {
      this.http.get(this.apiUrl + "/cicles"
      ).subscribe(
        (data) => {
          resolve(data);
        },
        (err) => {
          console.log(err)
        }
      );
    });
  }

  getApliquesOffers(){
    return new Promise<any>((resolve) => {
      this.http.get(this.apiUrl + "/offersApplied/"+this.userId, { 
        headers: new HttpHeaders().set('Authorization','Bearer ' + this.tokenLogin),
      }).subscribe(
        (data) => {
          resolve(data);
        },
        (err) => {
          console.log(err)
        }
      );
    });
  }

  postApliqueOffer(user_id: any, offer_id: any){
    return new Promise<any>((resolve) => {
      this.http.post(this.apiUrl + "/applied", {
        user_id: user_id,
        offer_id: offer_id,}, {
        headers: new HttpHeaders().set('Authorization','Bearer ' + this.tokenLogin),
      }).subscribe(
        (data) => {
          console.log(data);
          resolve(data);
        },
        (err) => {
          console.log(err)
        }
      );
    });
  }

  async abrirModal($image:any, $id: any, $titulo: any, $descripcion: any, $ciclo: any, $fecha: any, $cand: any){
    const modal = await this.modalCtrl.create({
      component: OfferComponent,
      componentProps: {
      imageCicle: $image,
      headline: $titulo,
      description: $descripcion,
      id: 'Id: '+$id,
      cicle_id: 'Id Ciclo: '+$ciclo,
      date_max: 'Fecha máx: '+$fecha,
      num_candidates: 'Num Candidatos: '+$cand
      }
      });
      await modal.present();
  }
  
  async abrirModal2($id: any, $titulo: any, $descripcion: any, $ciclo: any, $fecha: any, $cand: any){
    const modal = await this.modalCtrl.create({
      component: OfferComponent,
      componentProps: {
      headline: $titulo,
      description: $descripcion,
      id: 'Id: '+$id,
      cicle_id: 'Id Ciclo: '+$ciclo,
      date_max: 'Fecha máx: '+$fecha,
      num_candidates: 'Num Candidatos: '+$cand
      }
      });
      await modal.present();
  }

  borrarOfertas(idO: any){
    return new Promise<any>((resolve) => {
      this.http.delete(this.apiUrl + "/offers/"+idO, { 
        headers: new HttpHeaders().set('Authorization','Bearer ' + this.tokenLogin),
      }).subscribe(
        (data) => {
          resolve(data);
        },
        (err) => {
          console.log(err)
        }
      );
    });
  }

  //Register/Login

  register(name:String, surname:String, email:String, password:String, c_password:String, cicle_id: String){
    return new Promise((resolve) => {
      this.http.post(this.apiUrl+"/register", {
        name: name,
        surname: surname,  
        email: email,
        password: password,
        c_password: c_password,
        cicle_id: cicle_id,
      }).subscribe(
        (data) => {
          resolve(data);
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }

  login(email:String, password:String) {
    return new Promise((resolve) => {
      this.http
        .post(this.apiUrl + "/login", {
          email: email,
          password: password,
        })
        .subscribe(
          (data) => {
            this.token = data;
            resolve(data);
          },
          (err) => {
            console.log(err);
          }
        );
    });
  }

  activarUser(user_id:any){
    return new Promise((resolve)=>{
      this.http.post(this.apiUrl + "/activate", {
        user_id: user_id},{
        headers: new HttpHeaders().set('Authorization','Bearer ' + this.tokenLogin),
      })
      .subscribe(
        (data)=>{
          resolve(data);
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }

  //Token
  setToken(valor: any){
    this.tokenLogin= valor;
  }

  getToken(){
    return this.tokenLogin;
  }

  //CicleUser
  setcicleUser(valor: any){
    this.cicleUser=valor;
  }
  getcicleUser(){
    return this.cicleUser;
  }

  //OfertasId
  setOfertaId(valor: any){

    this.ofertaId=valor;
  }

  getOfertaId(){

    return this.ofertaId;
  }

  //UserId
  setUserId(valor: any){

    this.userId=valor;
  }
  getUserId(){
    return this.userId;
  }

  //Type
  setType(valor: any){
    this.type=valor;
  }

  getType(){
    return this.type;
  }

  //cicleIdFoto
  setCicleIdFoto(valor: any){
    this.cicleIdFoto=valor;
  }

  getCicleIdFoto(){
    return this.cicleIdFoto;
  }

  //Imágenes ofertas
  setImagesOffers(valor:any){
    this.imagesOffers=valor;
  }

  getImagesOffers(){
    return this.imagesOffers;
  }
}