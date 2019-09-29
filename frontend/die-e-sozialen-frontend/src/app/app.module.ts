import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { HilfeBietenPage, HilfeAnbietenModal, HilfeLoeschenModal } from "../pages/hilfe-bieten/hilfe-bieten";
import { CollapseModule } from '../pages/collapse';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { Splash } from '../pages/splash/splash'
import { HilfeBietenPageModule } from '../pages/hilfe-bieten/hilfe-bieten.module';
import { InformationenPageModule } from '../pages/informationen/informationen.module';
import { KartePageModule } from '../pages/karte/karte.module';
import { NachrichtenPageModule } from '../pages/nachrichten/nachrichten.module';
import { NeuigkeitenPageModule } from '../pages/neuigkeiten/neuigkeiten.module';


@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    HilfeAnbietenModal,
    HilfeLoeschenModal,
    Splash
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    BrowserAnimationsModule,
    CollapseModule,
    HttpClientModule,
    HilfeBietenPageModule,
    InformationenPageModule,
    KartePageModule,
    NachrichtenPageModule,
    NeuigkeitenPageModule
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
    HilfeBietenPage,
    HilfeAnbietenModal,
    HilfeLoeschenModal,
    Splash
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ResourcesProvider,
    FileEncryption,
    AuthProvider,
    BrowserAnimationsModule,
    Clipboard
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
