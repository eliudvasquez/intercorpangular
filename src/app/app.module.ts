import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { ClientsComponent } from './pages/clients/clients.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { RegisterclientComponent } from './components/forms/registerclient/registerclient.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

AngularFireDatabaseModule

const appRoutes: Routes=[
  {path:'',redirectTo:'/home', pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'clients',component:ClientsComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    HeaderComponent,
    RegisterclientComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
