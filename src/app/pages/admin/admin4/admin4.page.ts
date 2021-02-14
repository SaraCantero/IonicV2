import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RestService } from '../../../services/rest.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-admin4',
  templateUrl: './admin4.page.html',
  styleUrls: ['./admin4.page.scss'],
})
export class Admin4Page implements AfterViewInit{

  @ViewChild('barCanvas') private barCanvas: ElementRef;
  barChart: any;
  meses:any;
  año1:number;
  año2:number;
  contadorArrayMes=0;
  contadorMes=0;
  numOffers:any;
  fecha:any;
  mesesLetras=["Enero","Febrero","Marzo","Abril","Mayo","Junio",
  "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
  mesesLetrasFiltrado=[];
  cicles:any;
  ciclesFiltro= 0;
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
      }
      this.meses[this.contadorArrayMes]=mes;
      this.contadorArrayMes+=1;
      this.contadorMes=+1;
    });
    console.log("MESES");
    console.log(this.meses);
    console.log("MESES");
    this.ponerNombres();

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
    this.numOffers=[0,0,0,0,0,0];
    this.offers=null;
    this.restService.getOffers().then(
      (res:any) => {
        if(res.success){
          this.offers=res.data;
          console.log("IF");

          console.log("CicleF: "+this.ciclesFiltro);
            this.offers.forEach((fd) => {
              console.log("FD: "+fd.cicle_id);
              if (this.ciclesFiltro == fd.cicle_id || this.ciclesFiltro==0){
                console.log("IF2");
                console.log("CiclesFiltro: "+this.ciclesFiltro);
                const anoOferta=parseInt(fd.date_max.substring(0,4));
                console.log(anoOferta);
                const fechaOferta=parseInt(fd.date_max.substring(5,7));
                console.log(fechaOferta);
                
                for(let i=0; i<this.meses.length; i++){
                  console.log("FOR")
                  if(this.año1==anoOferta || this.año2==anoOferta){
                  if(this.meses[i]==fechaOferta){
                    console.log("IF3");
                    console.log("Meses: "+this.meses[i]+" FOfertas: "+fechaOferta);
                    this.numOffers[i]=this.numOffers[i]+1;
                    console.log(this.numOffers[i]);
                  }}
                  console.log("FOR2");
                }
              }
            });         
        console.log("OFERTAS");
        console.log(this.numOffers);
        console.log("OFERTAS");
        this.ngAfterViewInit();
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
    console.log("FILTRO");
    console.log(event);
    console.log("FILTRO");
    this.cargaCiclos();
    this.cargaOfertas();
  }
  
  ponerNombres(){
    this.meses=this.meses.reverse();
    console.log(this.meses);
    for(let i=0;i<this.meses.length;i++){
      this.mesesLetrasFiltrado[i]=this.mesesLetras[this.meses[i]-1];
      this.mesesLetrasFiltrado;
    }
  }

  ngOnInit(){}
  ngAfterViewInit(){
    this.barChartMethod();
  };

  barChartMethod() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.mesesLetrasFiltrado,//Datos horizontales
        datasets: [{
          label: 'Ofertas',
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
