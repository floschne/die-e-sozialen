import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NeuigkeitenPage, ModalContentPage } from './neuigkeiten';

@NgModule({
  declarations: [
    NeuigkeitenPage,
    ModalContentPage
  ],
  imports: [
    IonicPageModule.forChild(NeuigkeitenPage),
  ],
})
export class NeuigkeitenPageModule {
  ResourcesProvider
}
