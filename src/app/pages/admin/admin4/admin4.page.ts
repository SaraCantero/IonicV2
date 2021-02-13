import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RestService } from '../../../services/rest.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-admin4',
  templateUrl: './admin4.page.html',
  styleUrls: ['./admin4.page.scss'],
})
export class Admin4Page  implements AfterViewInit{

  @ViewChild('barCanvas') private barCanvas: ElementRef;
  barChart: any;
  meses:any;
  año1:number;
  año2:number;
  contadorArrayMes=0;
  contadorMes=0;
  numOffers:any;
  fecha:any;
  cicles:any;
  ciclesFiltro=5;
  offers=[];

  constructor(public restService: RestService) {
    this.numOffers=[0,0,0,0,0,0];
    this.meses=[0,0,0,0,0,0];
    this.año1=null;

    //FECHA
    this.fecha=new Date().toISOString();
    console.log("FECHA");
    console.log(this.fecha);
    console.log("FECHA");
    this.año1=parseInt(this.fecha.substring(0,4));
    let mes=parseInt(this.fecha.substring(5,7));
    this.meses.forEach(() => {
      mes = mes-this.contadorMes;
      if( mes <= 0 || mes<-2){
        mes=12;
        this.contadorMes=0;
        this.año2=this.año1-1;
        console.log("Año2: "+this.año2);
      }
      console.log(mes);
      this.meses[this.contadorArrayMes]=mes;
      this.contadorArrayMes+=1;
      this.contadorMes=+1;
    });
    console.log("MESES");
    console.log(this.meses);
    console.log("MESES");
    // for (let i = 0; i < this.meses; i++) {
    //   console.log("HOLA?");
    //   let numero = parseInt(this.fecha.substring(5,7));
    //   console.log("NUMERO");
    //   console.log(numero);
    //   console.log("NUMERO");
    //   if( numero <= 0){
    //     numero+=12;
    //   }
    //   this.meses.push(numero.toString());
    // }


    this.cargaCiclos();
    this.cargaOfertas();
  }

  cargaCiclos(){
    this.restService.getCicles().then(
      (res:any) => {
        if(res.success){
        this.cicles=res.data;
        console.log("CICLOS");
        console.log(this.cicles);
        console.log("CICLOS");
      }
    },
    (err)=>{
      console.log(err)
    }
    );
  }
  cargaOfertas(){
    this.restService.getOffers().then(
      (res:any) => {
        if(res.success){
          this.offers=res.data;
          console.log("IF");

            this.offers.forEach((fd) => {
              const element= fd;
              console.log(element);
              if (this.ciclesFiltro === element.cicle_id){
                console.log("IF2");
                const anoOferta=parseInt(fd.date_max.substring(0,4));
                console.log(anoOferta);
                const fechaOferta=parseInt(fd.date_max.substring(5,7));
                console.log(fechaOferta);
                
                for(let i=0; i<this.meses.length; i++){
                  console.log("FOR")
                  if(this.año1===anoOferta || this.año2===anoOferta){
                  if(this.meses[i]===fechaOferta){
                    console.log("IF3");
                    console.log("Meses: "+this.meses[i]+" FOfertas: "+fechaOferta);
                    this.numOffers[i]=this.numOffers[i]+1;
                    console.log(this.numOffers[i]);
                  }}
                  console.log("FOR2");
                }
                //this.numOffers.push(element);
                // this.numOffers[this.contador]=element;
                // this.contador=this.contador+1;
              }
            });         
        console.log("OFERTAS");
        console.log(this.numOffers);
        console.log("OFERTAS");
      }
      return true;
      },
    (err) =>{
      console.error(err);
      return false;
    }
    );
  }

  onChange(event: number){
    this.ciclesFiltro = event;
    console.log("CICLO");
    console.log(event);
    console.log("CICLO");
    this.cargaCiclos();
    setTimeout(()=>{
      console.log(this.numOffers);
    this.numOffers = [0,0,0,0,0,0];
    let anno=parseInt(this.fecha.substring(0,4));
    let mes=parseInt(this.fecha.substring(5,7));
    for (let i=0; i>this.numOffers.length; i++){
      const element =this.numOffers[i];
      let annoAct= parseInt(element.date_max.substring(0,4));
      let mesAct = parseInt(element.date_max.substring(5,7));
      for(let i =0; i>this.numOffers.length; i++){
        let mesAnt= mesAct -i;
        let annoAnt= annoAct;
        if(mesAnt<=0){
          mesAct+=12;
          annoAnt-=1;
        }
        console.log(mesAct+"/"+anno);
        if(mesAnt === mesAct && annoAnt === annoAct){
          this.numOffers[i]+=1;
        }

      }
  }
    console.log(this.numOffers);
    this.barChartMethod();
  });
}
  ngOnInit(){}
  ngAfterViewInit(){
    this.barChartMethod();
  };

  barChartMethod() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.meses,//Datos horizontales
        datasets: [{
          label: 'Offers',
          data: this.numOffers,//Datos verticales
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

}
