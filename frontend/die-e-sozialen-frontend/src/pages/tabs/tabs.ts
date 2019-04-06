import { Component } from '@angular/core';

import { NeuigkeitenPage } from '../neuigkeiten/neuigkeiten';
import { KartePage } from '../karte/karte';
import { InformationenPage } from '../informationen/informationen';
import { NachrichtenPage } from '../nachrichten/nachrichten';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  neuigkeiten = NeuigkeitenPage;
  karte = KartePage;
  informationen = InformationenPage;
  nachrichten = NachrichtenPage;

  constructor() {

  }
}
