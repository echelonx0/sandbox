import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { CountsComponent } from './components/counts/counts.component';

import { environment } from '../environments/environment';


import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { FlashMessagesModule } from 'angular2-flash-messages';

// 1. firebase related imports
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    CountsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,   
    FlashMessagesModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
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
