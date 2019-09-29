import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NachrichtenPage, ModalContentPage, ModalContentQRPage } from './nachrichten';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  declarations: [
    NachrichtenPage,
    ModalContentPage,
    ModalContentQRPage
  ],
  imports: [
    NgxQRCodeModule,
    IonicPageModule.forChild(NachrichtenPage),
  ],
})
export class NachrichtenPageModule {}
