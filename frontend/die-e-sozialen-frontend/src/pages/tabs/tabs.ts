import { Component } from '@angular/core';

import { NeuigkeitenPage } from '../neuigkeiten/neuigkeiten';
import { KartePage } from '../karte/karte';
import { InformationenPage } from '../informationen/informationen';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  neuigkeiten = NeuigkeitenPage;
  karte = KartePage;
  informationen = InformationenPage;

  constructor() {

  }
}
