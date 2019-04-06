import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NeuigkeitenPage } from './neuigkeiten';
import { ResourcesProvider } from '../../providers/resources/resources';

@NgModule({
  declarations: [
    NeuigkeitenPage,
  ],
  imports: [
    IonicPageModule.forChild(NeuigkeitenPage),
  ],
})
export class NeuigkeitenPageModule {
  ResourcesProvider
}
