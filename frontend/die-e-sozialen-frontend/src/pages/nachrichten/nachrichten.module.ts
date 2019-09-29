import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NachrichtenPage, ModalContentPage } from './nachrichten';

@NgModule({
  declarations: [
    NachrichtenPage,
    ModalContentPage
  ],
  imports: [
    IonicPageModule.forChild(NachrichtenPage),
  ],
})
export class NachrichtenPageModule {}
