import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientsService } from 'src/app/services/clients/clients.service';

@Component({
  selector: 'app-registerclient',
  templateUrl: './registerclient.component.html',
  styleUrls: ['./registerclient.component.scss']
})
export class RegisterclientComponent implements OnInit {

  public documentId = null;
  public currentStatus = 1;
  public newClientForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    apellidoPaterno: new FormControl('', Validators.required),
    apellidoMaterno: new FormControl('', Validators.required),
    edad: new FormControl('', Validators.required),
    fecNacimiento: new FormControl('', Validators.required)
  });

  constructor(
    private clientsService: ClientsService
  ) { 
    this.newClientForm.setValue({
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      edad: '',
      fecNacimiento: ''
    });
  }

  ngOnInit() {
  }

  public newClient(form, documentId = this.documentId) {
    console.log(`Status: ${this.currentStatus}`);
    if (this.currentStatus == 1) {
      let fecProbableDeath = new Date(form.fecNacimiento);
      fecProbableDeath.setFullYear(fecProbableDeath.getFullYear()+74);//74.9 edad estimada de vida según https://www.google.com/publicdata/explore?ds=d5bncppjof8f9_&met_y=sp_dyn_le00_in&idim=country:PER:BOL:PAN&hl=es&dl=es
      fecProbableDeath.setMonth(fecProbableDeath.getMonth()+Math.floor(0.98*12));
      let data = {
        nombre: form.nombre,
        apellidoPaterno: form.apellidoPaterno,
        apellidoMaterno: form.apellidoMaterno,
        edad: form.edad,
        fecNacimiento: new Date(form.fecNacimiento),
        fecProbableMuerte: fecProbableDeath
      }
      this.clientsService.createClient(data).then(() => {
        console.log('Documento creado exitósamente!');
        this.newClientForm.setValue({
          nombre: '',
          apellidoPaterno: '',
          apellidoMaterno: '',
          edad: '',
          fecNacimiento: ''
        });
      }, (error) => {
        console.error(error);
      });
    } else {
      let data = {
        nombre: form.nombre,
        apellidoPaterno: form.apellidoPaterno,
        apellidoMaterno: form.apellidoMaterno,
        edad: form.edad,
        fecNacimiento: form.fecNacimiento
      }
      this.clientsService.updateClient(documentId, data).then(() => {
        this.currentStatus = 1;
        this.newClientForm.setValue({
          nombre: '',
          apellidoPaterno: '',
          apellidoMaterno: '',
          edad: '',
          fecNacimiento: ''
        });
        console.log('Documento editado exitósamente');
      }, (error) => {
        console.log(error);
      });
    }
  }

}
