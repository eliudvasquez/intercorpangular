import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { toArray } from 'rxjs/operators';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  public clients = [];
 
  constructor(
    private clientsService: ClientsService
  ) { }

  ngOnInit() {
    this.clientsService.getAllCLients().subscribe((clientSnapshot)=>{
      this.clients = [];
      clientSnapshot.forEach((clientData:any)=>{
        this.clients.push({
          id: clientData.payload.doc.id,
          data: clientData.payload.doc.data()
        });        
      })
    }); 
  }
}
