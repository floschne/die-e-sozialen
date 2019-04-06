import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KartePage } from './karte';
import { ResourcesProvider } from '../../providers/resources/resources';

@NgModule({
  declarations: [
    KartePage,
  ],
  imports: [
    IonicPageModule.forChild(KartePage),
  ],
})
export class KartePageModule {
}
