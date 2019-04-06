import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NachrichtenPage } from './nachrichten';

@NgModule({
  declarations: [
    NachrichtenPage,
  ],
  imports: [
    IonicPageModule.forChild(NachrichtenPage),
  ],
})
export class NachrichtenPageModule {}
