import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/services/clients/clients.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public edades : number[] = [];
  public avg : number = 0;
  public clients = [];
  public edadMax : number = 0;
  public edadMin : number = 0;
  public varianza : number = 0;
  public desvEstandar : number = 0;

  constructor(
    private clientsService:ClientsService
  ) { }

  ngOnInit() {
    this.clientsService.getAllCLients().subscribe((clientSnapshot)=>{

      clientSnapshot.forEach((clientData:any)=>{
        this.edades.push(clientData.payload.doc.data().edad); 
        
        this.clients.push({
          id: clientData.payload.doc.id,
          data: clientData.payload.doc.data()
        }); 
      })             

      this.onCalcProm();
    }); 
  }

  onCalcProm(){
    let total = this.edades.reduce(function(a, b){ return a + b; }); 
    this.avg = total/this.edades.length;
    this.edadMax = Math.max.apply(null,this.edades);
    this.edadMin = Math.min.apply(null,this.edades);
  /*   console.log(this.avg);
    console.log(total);
    console.log(this.edades); */
    let sumaVarianza:number = 0;    
    this.edades.forEach(x =>{ (sumaVarianza = sumaVarianza + Math.pow(x-this.avg,2))})
    this.varianza = sumaVarianza / this.edades.length;
    this.desvEstandar = Math.sqrt(this.varianza);
  }

  /* propiedad de Eliud Vasquez */

}
