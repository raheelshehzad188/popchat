import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { IonicStorageModule } from '@ionic/storage';
import { TimeagoModule } from 'ngx-timeago';


// geolocation and native-geocoder
// import {TimeAgoPipe} from 'time-ago-pipe'


@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot({ swipeBackEnabled: false ,mode: 'ios' }),
        IonicStorageModule.forRoot(),
        HttpClientModule,
        AppRoutingModule,
        TimeagoModule.forRoot(),
        provideFirebaseApp(() => initializeApp(environment.firebase)),
            provideFirestore(() => getFirestore()
        )
    ],
    providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
    bootstrap: [AppComponent],
})
export class AppModule {}
