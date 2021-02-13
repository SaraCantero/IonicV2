import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RestService } from '../../../services/rest.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-admin4',
  templateUrl: './admin4.page.html',
  styleUrls: ['./admin4.page.scss'],
})
export class Admin4Page  {

  @ViewChild('barCanvas') private barCanvas: ElementRef;
  barChart: any;
  meses:any;
  numOffers:any;
  fecha:any;
  cicles:any;

  constructor(public restService: RestService) {
    this.numOffers=[0,0,0,0,0,0];
    this.meses=[0,0,0,0,0,0];
    this.fecha=new Date().toISOString();
    for (let i = 0; i < this.meses; i++) {
      let numero = parseInt(this.fecha.substring(5,7));
      if( numero <= 0){
        numero+=12
      }
      this.meses.push(numero.toString());
    }
    this.cargaCiclos();
  }

  cargaCiclos(){
    this.restService.getCicles().then(
      (res:any) => {
        if(res.success){
        this.cicles=res.data;
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
          this.numOffers=[];
          for (let i = 0; i < res.data.length; i++) {
            const element= res.data[i];
              if (this.cicles == element.cicle.id){
                this.numOffers.push(element);
              }         
        }
      }
      return true;
      },
    (err) =>{
      console.error(err);
      return false;
    }
    );
  }

  OnChange(event){
    this.cicles = event.detail.value;
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
        labels: this.meses,
        datasets: [{
          label: 'Offers',
          data: this.numOffers,
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
