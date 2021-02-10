import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
//import { registerLocaleData } from "@angular/common";
//import { resolve } from "dns";

@Injectable({
  providedIn: "root",
})
export class RestService {
  
  apiUrl = "https://allsites.es/sales_in_api/public/api";
  token: any;
  token2 = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNzAyZjBiYTZiZjEyODczZDcwNzBhZWVhMDM0NDA3MTExOGFiZTkyZGVlYjBlMmZhNGFiZmYyOGQ2NTA0NGZhYWY3MmZiODIxNDcwMzNhNTMiLCJpYXQiOjE2MTI0NTc2NDQsIm5iZiI6MTYxMjQ1NzY0NCwiZXhwIjoxNjQzOTkzNjQ0LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.PUITd2nGwnGZ5T8q-R2u6D-XmhZjvjzUbLt_5Hj1t5S54I0ngVgAxMTxZLyf3sFHZEmtOjydZXiwzsUZPVxMxfK7yHwdi_sbhkIDexO4FMmc699zui4v53tmzipk7Pp70enPN65xW3lr4K6-LnYejrXLcmquOlkqE9ZKGa0a_4HVfD_efp0EB4qvyAqmuPM68trmmu-CYYG3zdaSFIGmGvF9RFN6iY9vWxkNs3xeIJO_ebvNN33MEMrIKXdnqxVk2PiENJvR3Mp3gZYhF2reNKQxYeQHjkqWQXqQfD1TW1u0VrB8TJRU6eNYLty_Jt23LFPcLEdEuZMudH4mWqs1C5aKE2GCyx0heT3M3tdqr1EmTz2a4QWmG3gtmKFN8VH2jIip4J5GuUJGr-vUarbFuikCLq4brnv5mtvGvtPayguhWQK6t8JRb6nJXMXm36wjN_mqChKGmNT7N9rdk4hrdsF4Ic9K_S6cLhkCiLmc43R-2tVAF5f-WCqv46wwJywGk5Mb6xKyHjBTEpDUssm_omhlrW9PNZBwzW99La4VKHDb9Oq_KCk7o2jeMVIkYpCFAXt-ywrUEpD4iA5BcKyIcie8iyY8h3M7KwzFD1FLnhiazyFQ8u_9ZUOnPB97JhIfQkiu1v_MLg_ZkoRy3QtOUUUr0HADleu0Xm7LpiQ-5e0";
  tokenLogin: any;
  cicleUser=1;
  actUser:any;
 

  constructor(private http: HttpClient) {}

  getUsuarios(){
    return new Promise((resolve) => {
      this.http.get(this.apiUrl +"/users", {
        headers: new HttpHeaders().set('Authorization','Bearer ' + this.token2),
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

  getOffers() {
    return new Promise<any>((resolve) => {
      this.http.get(this.apiUrl + "/offers", { 
        headers: new HttpHeaders().set('Authorization','Bearer ' + this.token2),
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

 

  setToken(valor: any){
    this.tokenLogin= valor;
  }

  getToken(){
    return this.tokenLogin;
  }
  setcicleUser(valor: any){
    this.cicleUser=valor;
  }
  getcicleUser(){
    return this.cicleUser;
  }

  setActUser(valor: any){
    this.actUser= valor;
  }

  getActUser(){
    return this.actUser;
  }



}