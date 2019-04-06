import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NeuigkeitenPage } from '../pages/neuigkeiten/neuigkeiten';
import { InformationenPage } from '../pages/informationen/informationen';
import { KartePage } from '../pages/karte/karte';
import { ResourcesProvider } from '../providers/resources/resources';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    NeuigkeitenPage,
    InformationenPage,
    KartePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    NeuigkeitenPage,
    KartePage,
    InformationenPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ResourcesProvider
  ]
})
export class AppModule {}
