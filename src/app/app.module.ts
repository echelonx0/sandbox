import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { CountsComponent } from './components/counts/counts.component';

import { environment } from '../environments/environment';

import { OwlModule } from 'ngx-owl-carousel';


import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { FlashMessagesModule } from 'angular2-flash-messages';

// 1. firebase related imports
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ComplaintComponent } from './components/complaint/complaint.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReportsComponent } from './components/reports/reports.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    CountsComponent,
    ComplaintComponent,
    DashboardComponent,
    ReportsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,   
    FlashMessagesModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    OwlModule,
     // 3. Initialize
     AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule // storage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
