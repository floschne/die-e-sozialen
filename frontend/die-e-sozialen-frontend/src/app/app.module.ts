import {HilfeBietenPage} from "../pages/hilfe-bieten/hilfe-bieten";
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
import { FileEncryption } from '@ionic-native/file-encryption/ngx';
import { AuthProvider } from '../providers/auth/auth';
import { NachrichtenPage, ModalContentPage } from '../pages/nachrichten/nachrichten';
import * as OpenPGP from "openpgp"

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    NeuigkeitenPage,
    InformationenPage,
    KartePage,
    ModalContentPage,
    NachrichtenPage,
    HilfeBietenPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    NeuigkeitenPage,
    KartePage,
    InformationenPage,
    ModalContentPage,
    NachrichtenPage,
    HilfeBietenPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ResourcesProvider,
    FileEncryption,
    AuthProvider
  ]
})
export class AppModule {
}
