import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatToolbarModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule
} from "@angular/material";

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

const firebaseConfig:any = {
  apiKey: "AIzaSyAWxqzVtOuC74J9zVJ72OLl5su7mThp3bo",
  authDomain: "angular-pwa-1e8cc.firebaseapp.com",
  databaseURL: "https://angular-pwa-1e8cc.firebaseio.com",
  projectId: "angular-pwa-1e8cc",
  storageBucket: "angular-pwa-1e8cc.appspot.com",
  messagingSenderId: "778964810246"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
