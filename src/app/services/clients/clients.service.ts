import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  public getAllCLients(){
    return this.firestore.collection('clientes').snapshotChanges();
  }

  public createClient(data: any) {
    return this.firestore.collection('clientes').add(data);
  }

  public updateClient(documentId: string, data: any) {
    return this.firestore.collection('clientes').doc(documentId).set(data);
  }
}
