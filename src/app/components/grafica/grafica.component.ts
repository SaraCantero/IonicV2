import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.scss'],
})
export class GraficaComponent {

  public barChartOptions:any ={
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels:string[]=['0','0','0','0','0','0'];
  public barChartType:string='bar';
  public barChartLegend:boolean=true;

  public barChartData:any[]=[
    {data:[]}

  ]
  
  
  
}
