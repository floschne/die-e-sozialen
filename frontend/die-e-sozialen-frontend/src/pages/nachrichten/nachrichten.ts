import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform, ViewController, Loading, Modal, Form } from 'ionic-angular';
import { ResourcesProvider } from '../../providers/resources/resources';
import { HttpClient } from '@angular/common/http';
import { FileEncryption } from '@ionic-native/file-encryption/ngx';
import { PARAMETERS } from '@angular/core/src/util/decorators';
import { AuthProvider } from '../../providers/auth/auth';
import * as OpenPGP from '../../assets/scripts/openpgp.min';
import * as OpenPGPWorker from '../../assets/scripts/openpgp.worker.min';

// /**
//  * Generated class for the NeuigkeitenPage page.
//  *
//  * See https://ionicframework.com/docs/components/#navigation for more info on
//  * Ionic pages and navigation.
//  */

@IonicPage()
@Component({
  selector: 'page-nachrichten',
  templateUrl: 'nachrichten.html'
})
export class NachrichtenPage {
  loggedIn: boolean = this.authProvider.loggedIn;

  messages: JSON;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public httpClient: HttpClient,
    public modalCtrl: ModalController,
    public authProvider: AuthProvider) {

  }

  ionViewDidLoad() {
    var resources = new ResourcesProvider(this.httpClient);
    resources.getMessages().subscribe(response => {
      this.messages = response;
    })
  }

  openModal(message) {

    console.log(message);
    let modal = this.modalCtrl.create(ModalContentPage, {message: message});
    modal.present();
  }

  login(form: Form) {
    console.log(form);
    this.authProvider.login('testUser');
  }

  ngDoCheck() {
    this.loggedIn = this.authProvider.loggedIn ? true : false;
  }
}

@Component({
  templateUrl: 'modal-content.html'
})
export class ModalContentPage {
  message = {};
  messages: JSON;
  loading: boolean = false;

  constructor(
    private fileEncryption: FileEncryption,
    public platform: Platform,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    public httpClient: HttpClient
  ) 
  {}

  

  ionViewDidLoad() {
    this.message = this.navParams.get('message');

//     const testMessage = `-----BEGIN PGP MESSAGE-----
//     Version: OpenPGP v2.0.8
//     Comment: https://sela.io/pgp/
    
//     wcBMAyV4+E/Bv1VqAQgAxnsio2fTVIWQ+uq6AAwaYo0ISr1WnD8UsC7KkkzpfYVX
//     GWTvr77S/KGiJ4mxB8jtVSLoQp34GolQRyMKVAq9CpU3kXzQcpJCg+gPTu87tsik
//     lEpipFNKAKALQeI87JGp0ehcf9SXR0ngyPey/vLLwD+OnAlnaW/kyLUMcc+nlAIp
//     eMc+PB6o/96b3vVAgo6UrjwCZnZIV5b9OSJiBJXQgeQYOAt2XaDqz9uIbxKZgPtv
//     bHOSTF61JsdVejgox992gFdjoLvAce0MFn3kv5QYfCI997fEcRxT9+3amvzos5JS
//     FJq3K9TQNfm6ke4Gau/gy81fPAceFQ4YNjIvVC4vldJJAd0NwSfsb6GE2+VgWr7y
//     VCoBGV7MvoV/GjdkncgBIPAM/mCloorpg3OvluL3wcXS2dhS8OHQaMQNtmqnlBj9
//     u0nZDSNGLHIYHQ==
//     =9J2+
//     -----END PGP MESSAGE-----`

//     const pubkey = `-----BEGIN PGP PUBLIC KEY BLOCK-----
//     Version: OpenPGP v2.0.8
//     Comment: https://sela.io/pgp/
    
//     xsFNBFyop8cBEADzoHryLtCatvdWsuFRDdkyS1g0U1kvXZFmmKNnxir+NgxM2UuD
//     1AhB2sWMUUYw2k/dJHOYBijXY5Z9k6z03EpfKlxi3xr8SmUzPD0pVyOdWcV3cd4G
//     jrWfgiY9WGa2Hu+WnAVLy96wzrw5rkB5TYatRNgn1ka/7bInudkpomRChBASR0LT
//     dee3amwoThFjJoRIb2eX61tqPfIDeFiQDJda9KCFZFh/vf507qpmGPE5aYfFTZUV
//     nS8Q93uodjWqTPagTYM+b/BltuRyRJIYVckRoZV2tHw9Qkiou6Qe7IFHnRBlEHfN
//     9scG6dXE7h8EnQBII+aezia+1NnG4CvTV2Zx3k2ogWTouyqlu+TWmJzCNaE5EUoz
//     btyER43stPVBY9oX7y/CACvNSkvJUR+akX/ClO9zR4v+UNvm8WrMrgk8MIvh/xH2
//     knks218mPR5FDfWqR71PQTxTWAFmuyMAe5r2oKk46W9uN2Z2lOQbcVHGxygdFutS
//     I95O0FKC8+e3WyOYsbqHT4a9pHPrclre5a26PqEAB1zLrrnm5m9CWZSMyT0GRE/0
//     4v3wtAlYjk3rtJ5cC4GX9DYiFny4AyRDPyC9y9gFcXUWjD4dOUTCf50MMB68VlhM
//     yxMAbaxpCEpcGiCL4fMuraPCBRRcPTV5FfDys9sQxkQQECacKtPSjGXnKQARAQAB
//     zQloYWNrYXRob27CwXAEEwEKABoFAlyop8cCGy8DCwkHAxUKCAIeAQIXgAIZAQAK
//     CRCF8ONDcpJrviF6EACcj/Jy1sLpDqi2seQIdUGLmgIFINHL4tt0zbT35tRKO3kK
//     InYF5aLq4nspxgVsPIHsNpcXim00z8SYUeiRdc2mDpalnRQhG+cmcChVDgAmoPfj
//     zg5bAVQoZmATsd3rgZXPgZvWaGCvLcI8go9v6tU4QhN3A6RSHeJjfl8sdlDFGJ/7
//     jMjTaDoTT0/HxT158yqgipqKsT91s6Osl3gqxLQFlW8I4bmNE2VguZWtAZ0SgxfK
//     ZZ7RetPoUul5Z3wUxCAJfuc+tohZnve/zoplWTqVRRAxbBuEzU8l8zWejOFohr8r
//     1nzw3iGbwIx3NT5aGEhnJ8WUmpfcsN035PvGOporUteskt6k8NyBNL0MiiLMM1Hy
//     8J9lXelppCFbjsswNlXjY264dRYiO9G0chWDftq7kCoP79ry147OGtT8UEGTQkvN
//     vI1jg8tTYz5UarEayYnP/Qg8nKOCjqqKIuq2285NMWVuLX/hknAwxcnmV/3/SpJz
//     pWHub7nNyLgMlT/1xoAwjLeWXGT92iObxcf+CNJX5ZllGqidqYsuaINLiBymfYRe
//     95aP6xUD21boBXbAsbWeTCiHTpqo6fq94JaOkTUy93euOiWv26jl7E++Sn4g6hj4
//     LsuatM93t2kOya6sVKTjq2WQXrpJhfNlSP/E13JHcxF3mvRm4W8kBef0qc63v87A
//     TQRcqKfHAQgA+yj8NFYhOeoy4qu+HevGDGV3hN7O/G4o7wPiV4sM/QY6s+OlcVm5
//     t1rbPiQgJNPXkgZUHhp0VBeWl1ov1jizWLbB5Nr0ffyuUL6DZ/lDqk5yaW+tGhk8
//     YKi+ZKaGmPMqogks+6+Y+tcQPm9/O2ax0N0Q9cIcylQSnqQCPioihFdWqOxPVjcc
//     hYeyGZZmaSjAoUCcCGaR2qN6RqDwPo6WA60lGAmtg6/7wO4pQLcjP1UEaV9ne67x
//     LNz6HcwZlxw8umFU6u+kgJqXfYSzc1Gf4J5HSgLxsGTudvOnFMJ9rqtmPopQ6XuC
//     WzfXxgQrKjOk7J9Vx7GcA5yDIUn5HQz/WQARAQABwsKEBBgBCgAPBQJcqKfHBQkP
//     CZwAAhsuASkJEIXw40Nykmu+wF0gBBkBCgAGBQJcqKfHAAoJECV4+E/Bv1VqOvYH
//     /id3AI2qZimc1gW+CC0KJMPuTSFKsatHq9yzt1Sp5e/V41YV3qMAfYq/WndAEtv2
//     bH52oqCknkgbeH2TKiEQWBlUYUjc+dFOVEglAcQRbRAuntmG5SqPQcUMiJIL7px3
//     VpGxbkiCDOJQ7jukqWPDQDrAemph0orwZSyqEydX2rfhkKZ5qdVGtMATT5dDTjHx
//     Uzo6pDFtHW8TApRgIXDy0WfvIPv8ILJsbyBUt5xILZp/KpOl5uxOp7vnis/WXImy
//     BYk4wJT/P4ajttPpzi1IDSghWH+PLpMaOsLKSQuYXYm8IGBXAnCqs0EXfnN1ggu+
//     +QeEWyLqs8BrYB9Szzy9P0IZlhAAqbN2gLO1FhkJ3FEwyZrYLQwJYdL0DHQpQAz3
//     LDbKUT1Ds+V4tbBpCpzdpiNXldVzOtwT4nejhMAxiHvH5eajnkvlfPltWedu445y
//     sCf31aFg1FBGcHP4u6RXb5f0O5+s3uxc+h9SgAQlTIMrbMrvyURM0FwQ5Pcw4pGu
//     wjwsd9lxZs+bMYyJ7Mq/F1kJu4nuSfHkRSnEromEV4OLMSnTbGP9gCTATKk2Piq+
//     TBKHAjy82DiP+dC03l6O97cOAL72ERcIWw6G/ufq6GQyC2DBWOWIRJNMRytd8vcM
//     tlxuNiKO6FP+66JljH2PcTqS4OkPOjS7m7pzoKgvH5aSnOVPYzjsBde5j39KvZ7R
//     Uqvn3qXDc2COW121ZbN5/25LKWhjkQ/ghE90ol8vGWBiAAkqscZ7V5118jN0LPWw
//     sL7TX66eQbuvxeRurYiFDGbQuHrHJ6jEl+fQn6un09aQMrVPw7N0lQPzVdOJ5zS9
//     UfdvQhn7e5+JKvsw/PMXXpiBpLYu9o0pcWqpzocdJemLJ+4MSzUF/3egKh4lYaXP
//     /KW/Toqik/nSs09TwFfUihBYHKIAIRG7kqZlAcqYFza0r+2UfudKJC/YXKURWlBR
//     qhyBmGnLR7FaENhJRuUx0HodhS7hpUe4NizDHBEjMLvmsAl+9utYVUh7kKo2ew/R
//     GOJK46jOwE0EXKinxwEIANyOlbTaEHom0p+t7axy6RT1ciqPd7EJGthQKT2M5EjB
//     BNDvvrl+MQYa4uhe5D0Z6pGftRThnNzvD/tXXEsCqLEUxVa+ut0Bzzm/YwftEzop
//     0oZliaWrMzLs1m1KUe5fh91PVBUCr+xmxuZzRb+aiYZHhqPjWvEvg9LHZpePdu+U
//     paNAqFkqY53y5C+zKAn1xOXAB1HsjDAgt3KOqzQloLrIYFuGfT69pp1cJ+Td0zKh
//     ODK51zAUDmObimzJYHM2B4hO8b7jQrbftDVL8yEKUnzhaIdh8mxjtYBEQADWDF8Z
//     Bm/ohI/AYl4nk6rWzf9ecVH9ruh7ihpqAuQggU+sHuUAEQEAAcLChAQYAQoADwUC
//     XKinxwUJDwmcAAIbLgEpCRCF8ONDcpJrvsBdIAQZAQoABgUCXKinxwAKCRDHzw5y
//     FrN9n3HbCACkaCwgxtZEcJ+M0xlEQ7jRJoygkwAeJPBnCJHB2n80U8BSXbIoLKuF
//     PSY43Mk8jxXsFKAvkpzd0XxgIKT7FYbDZRtYtjLed7mfcyEhcsNn2WRRix4AGcJ2
//     hxY/HN8eLbqsbGv7kcsEis94LroSsYSsJMU3BNmGopPUBeb/LmcHPwlED9hT/Xtd
//     TpiTcMys/Ickp0DK/umJSFcoPTv8wtP5Sm9hWzeh/pMTODdsbniVDB1cR8qGSOTI
//     DcZ+daff87tBrVclQy0R8zc3V+e/X90EnJ9BP8F4i2xnCuRil00NiuKW8/EzgW0O
//     MXfEylhmCAV7J1SDblWI123wv883iXln0dUQAKS/k6KJGtHSwFqWMTGpj4f06uNU
//     F9UL5KMiRm+NYkZTHNcf7bq3m30cqIqb7KnA+kdkHVMfokl3savsHNCb+maXIdYT
//     eqG9Y7OvuYqCQxVo4Obo7QCpeZEO6kQx/MlpQvKqlovdbhuOEBmBHXIeJzMV5STi
//     YPzLKKqdN0KwhdgTQf21dIhZ9jlL6VEwkBz0K1W4hVQM7Iv8fFirl0hhRAYFaoJo
//     2cOd9PUnNuGBfAgUWC34RlKJvDgK7y4A77lVVALTG7XLu+l4pBYCkqNjrTunh4h1
//     hB+Zt2QLe0dR2R8eBksyFxJH/SrsoT+QTqJrBcYG4BAKShMSlnkB6L6VzOA8Ldfo
//     Ux8tORHW1kqOsw4arHwsMgKSx0kADZcOVTIrLGGiChqMMxQ+iACXsU72KQq7KDXV
//     /6yz7fo/w7RCsszEZJwpbleS0neTHD1JY2OLghIoMQd9KcuSsJcb1FF/xiqNnqng
//     29Qfj2vhUggK2HLtLyCrBsKfZ0ReES2gcf/uF9X2t3jv1d5DQAlPJsCyNhBbE5v6
//     Jgyi06sfUYYqXR6q5I5hCuPtWRXuOnftyLNeF9BjK0uQJcAGglvE4VQUwRx+stNo
//     fl8JJch5ngF61SNnf8Vzodul2ZhzmIE7eYaQ52XyTHAWi7MERkpGYAXSwXYwsyUG
//     HRJN1yKoZUEpxuy/
//     =a88o
//     -----END PGP PUBLIC KEY BLOCK-----
//     `
// const privkey = `-----BEGIN PGP PRIVATE KEY BLOCK-----
// Version: OpenPGP v2.0.8
// Comment: https://sela.io/pgp/

// xcaGBFyop8cBEADzoHryLtCatvdWsuFRDdkyS1g0U1kvXZFmmKNnxir+NgxM2UuD
// 1AhB2sWMUUYw2k/dJHOYBijXY5Z9k6z03EpfKlxi3xr8SmUzPD0pVyOdWcV3cd4G
// jrWfgiY9WGa2Hu+WnAVLy96wzrw5rkB5TYatRNgn1ka/7bInudkpomRChBASR0LT
// dee3amwoThFjJoRIb2eX61tqPfIDeFiQDJda9KCFZFh/vf507qpmGPE5aYfFTZUV
// nS8Q93uodjWqTPagTYM+b/BltuRyRJIYVckRoZV2tHw9Qkiou6Qe7IFHnRBlEHfN
// 9scG6dXE7h8EnQBII+aezia+1NnG4CvTV2Zx3k2ogWTouyqlu+TWmJzCNaE5EUoz
// btyER43stPVBY9oX7y/CACvNSkvJUR+akX/ClO9zR4v+UNvm8WrMrgk8MIvh/xH2
// knks218mPR5FDfWqR71PQTxTWAFmuyMAe5r2oKk46W9uN2Z2lOQbcVHGxygdFutS
// I95O0FKC8+e3WyOYsbqHT4a9pHPrclre5a26PqEAB1zLrrnm5m9CWZSMyT0GRE/0
// 4v3wtAlYjk3rtJ5cC4GX9DYiFny4AyRDPyC9y9gFcXUWjD4dOUTCf50MMB68VlhM
// yxMAbaxpCEpcGiCL4fMuraPCBRRcPTV5FfDys9sQxkQQECacKtPSjGXnKQARAQAB
// /gkDCH0xk/O2V5pjYHS2nLy6uZ+vlxcMe1HDg5h9qlx7hlfx6YuHkZuTr/E7FneM
// 2E4VZnbS9uVRGp+Yj2b0FjSvA6oD+pSAD+kJwJ/2CFCrzkxfFGOrZVrfbNjLvw+M
// T7ru4XLW8f3DYAI0GG2JHIVotG7ojrhdDPbGRyI/DZ+ekHfIX4QcIfkjmbWdcOS5
// E4QPLQK890GmOgytC91V9rKNNaOySyfbVPMnPi+1P+tQ7JAo9YfRN9hwstwvU/41
// aUYSacdmV0PjOOUXnh8c/a2tBDH9VY762t4uKaDHjgs5EZMp3FlvGIDpkLdm5pJc
// tJrOGMD9dPxk85YR3sf3aLWCMZ75/sHEcJCHLqkFci6mnB3Z7BDgoduxICo3O2CJ
// jweNK4J9chiHYbMHrNxCQdEEusgt3ioy8TqJNvET01/A+dP8W+GM90xXaP4z4N0a
// aijdNMXXxscG7Rs7v03NEo6PJ1gdMoCQP41tL0uM4poIbIF85axz/mMHyysqyoI9
// FL7K73D6kO/OUtKS2UkyacGI9jH9Um7uDkSVM6kdEIyvjYH4PSj8NlZ0PVUUPIre
// aZpyFi02d7KqWcGVc6YPkVPWbRMpk97FSHXjDO8UdxrvcTBTB+ro+jr7ov57+htE
// eoyO2FxJAiCBZCNJHBjOzm6LJcGou9n2ohjVjh3Bl2frkqRPgfvBTZYNtDqAXCMZ
// v+WjEzOQHSbtSJHi2hrGhsEvz8GQhANUo5OhcWKBR1V+q2W9Lv6DIkBqxmjIkjaS
// Uza9qVo2sx8HuYATP6k8u5SVp7KSSuvBt9jI2exV9eLwHzGfL7PApYP3IrNq8UVc
// ZzJ2MrqyeN/43ICubadbO8nKsHq9WO5j7ytKZsE08vlw5bPNat0qBcXoHfMYZhV8
// tGVcNsFZdUTkRb0P+VVl/djYb6DGl+t3m2KjaM29OniEGlzodmDytXJwav+d/iUt
// a3DuWID5dlBqUJrIvpxpN33p7kedKJDfiQEMppoC+YytELCckt0Eh99KIJd5Hy7p
// 8CQYeEF87ZA9FAXjgRK0Smn6qpKKs72x94d9JpJ8PkP7hrNLA/jecnE8nOY7r/yd
// xhiWNbmU+r1fX9Ob0MYbO96TPEItBasStQxVIcvl0BCp2ElOarIL1KgbfIN4OA1y
// +QQ+AjVFeE4VHMefdnzsXHk7xvYrPigRyeGGSmFJT65hW6cWM/pv0AH75/e9NfgG
// kIzgU/CrcFtFeP7CdnN2qd4yS+RxKE47/pnDd3ilBJ1HByUVBzyA+EbvA8Qh/oll
// 6J73m/bvkpXoNspEODe0CZ4ngsTw7XNyZ32TgDKqPhEn6jziz+QPNo0T5TMUN6mt
// ZE4ewNt6ifPHY6FVCZX96l7YjID56adXHC1Hpat/7TCZB31euTBu+bmPNtrik/kA
// TyVTp3lFDERbhwidf2OyOwQ1D/Xk7uz7thoDWUpkeyl0kRzjfpn81rA5JVmjK0Rj
// cfwroV95I24pWkEEdTw/Gt8DuV8qaX1Q3WfDyHu3QJzRX0/Z+Ayyg8aOLZ6TSXXD
// LfFiJ/CWwCZlhmkcHMoIN/kj8EiCAB+JKFyeELcHUOf3AfOzs/IlokH0JSvPadWu
// osmUvgRWQDgMn3f8lEa9BKKC/0Fmj6gdKg48iUlyX2YSgAUIOCzczwo4olPIm27w
// fTo033bjKXkvp48lAg1pv3mwd8yPTpcoBdjOL2GgKyXrp3faX7+Md+cUMkB5pRt8
// JXF74+BVir9NKe8EnJGyP0hlOR6no2zxXMVNYV+ooKMXq55vg3JVllbNCWhhY2th
// dGhvbsLBcAQTAQoAGgUCXKinxwIbLwMLCQcDFQoIAh4BAheAAhkBAAoJEIXw40Ny
// kmu+IXoQAJyP8nLWwukOqLax5Ah1QYuaAgUg0cvi23TNtPfm1Eo7eQoidgXlouri
// eynGBWw8gew2lxeKbTTPxJhR6JF1zaYOlqWdFCEb5yZwKFUOACag9+PODlsBVChm
// YBOx3euBlc+Bm9ZoYK8twjyCj2/q1ThCE3cDpFId4mN+Xyx2UMUYn/uMyNNoOhNP
// T8fFPXnzKqCKmoqxP3Wzo6yXeCrEtAWVbwjhuY0TZWC5la0BnRKDF8plntF60+hS
// 6XlnfBTEIAl+5z62iFme97/OimVZOpVFEDFsG4TNTyXzNZ6M4WiGvyvWfPDeIZvA
// jHc1PloYSGcnxZSal9yw3Tfk+8Y6mitS16yS3qTw3IE0vQyKIswzUfLwn2Vd6Wmk
// IVuOyzA2VeNjbrh1FiI70bRyFYN+2ruQKg/v2vLXjs4a1PxQQZNCS828jWODy1Nj
// PlRqsRrJic/9CDyco4KOqooi6rbbzk0xZW4tf+GScDDFyeZX/f9KknOlYe5vuc3I
// uAyVP/XGgDCMt5ZcZP3aI5vFx/4I0lflmWUaqJ2piy5og0uIHKZ9hF73lo/rFQPb
// VugFdsCxtZ5MKIdOmqjp+r3glo6RNTL3d646Ja/bqOXsT75KfiDqGPguy5q0z3e3
// aQ7JrqxUpOOrZZBeukmF82VI/8TXckdzEXea9GbhbyQF5/Spzre/x8MGBFyop8cB
// CAD7KPw0ViE56jLiq74d68YMZXeE3s78bijvA+JXiwz9Bjqz46VxWbm3Wts+JCAk
// 09eSBlQeGnRUF5aXWi/WOLNYtsHk2vR9/K5QvoNn+UOqTnJpb60aGTxgqL5kpoaY
// 8yqiCSz7r5j61xA+b387ZrHQ3RD1whzKVBKepAI+KiKEV1ao7E9WNxyFh7IZlmZp
// KMChQJwIZpHao3pGoPA+jpYDrSUYCa2Dr/vA7ilAtyM/VQRpX2d7rvEs3PodzBmX
// HDy6YVTq76SAmpd9hLNzUZ/gnkdKAvGwZO5286cUwn2uq2Y+ilDpe4JbN9fGBCsq
// M6Tsn1XHsZwDnIMhSfkdDP9ZABEBAAH+CQMIV1QamN6tFHJg9RpRYn221qe3OvYS
// vC5ZRNYH08mrzac5I15Lp7zxYMmUI0Y+a3WnTThLXvGizcsP1u6ujeF1N2OS/u7A
// 2Tgmz9VwgcBSHAYu2URXAKRaB/xZHxB51fIesl4VbIw9U/PBMNShv6OquzhHi0ot
// wk/0n7XHrutrMw6sK/de3l6FV1lHmKtFxcoLIDhBhuMM2LhJgq1pQiCf4vAn3Rx8
// iLF7lWAp+Skev+v+oiBw/2qzeWkZDzkNQbhWgic5fx6OqVxVBFhcVpdeVAw5fszE
// zMFxTKVuGFQ21bl6PG4WcjUGWf4tlnacyv+7Z+Nw2UiA9k9e9s4q7dOxxywNzT+j
// B/csvV+PqVc9LSU2HRxmPf+Vrjle/kcKGf7b5BkW5jnOWm0l69GfonXrryc+q7/N
// UbHabBAKEwEFdweB+KqRDIiEdxCKTVJOjPBC9VTCb0TgIlQ/6I4ipLroLgeZ7AqB
// k9ERACDuBVSJokI5L4r85gorxqG1X1n8TwjRBKHcM+0JTP/uQdxwrj9ITg8RB2sI
// h79g9FnfTD6L/fpL69ymbgInhew4Y+usWoJQrpCsNRHS5FYQ68jfJcakpTEQXYDc
// hbjsryhHJ1bKZawzJfzR02B79Ygjp8Cfs3jYHWWLmn62Sodj86Nld9rt2mMvWxDq
// vOgIfJ+aoaDdrP8fv7l/7XQki35xqPFXBr9i/DbfyryQZ2SauINiHGigzpbAiqv0
// tuu6Hr1UD0vardAcMZmBT2zb095VcZgM3Aq+Z5iJsAssHaQrGIjhbYeT/BIOtOdD
// 6lKICKZU/xZZR6euTk5/d5TjvF/zWXPwaU/L9yC3tDKZsUJvSaeJFBTnYp2gx6Ry
// RsozNdz4tplkDPFso72EALbaEME8AftEyJm4B+FDgOpZES+u1E5ghxI7+G52IJa0
// wsKEBBgBCgAPBQJcqKfHBQkPCZwAAhsuASkJEIXw40Nykmu+wF0gBBkBCgAGBQJc
// qKfHAAoJECV4+E/Bv1VqOvYH/id3AI2qZimc1gW+CC0KJMPuTSFKsatHq9yzt1Sp
// 5e/V41YV3qMAfYq/WndAEtv2bH52oqCknkgbeH2TKiEQWBlUYUjc+dFOVEglAcQR
// bRAuntmG5SqPQcUMiJIL7px3VpGxbkiCDOJQ7jukqWPDQDrAemph0orwZSyqEydX
// 2rfhkKZ5qdVGtMATT5dDTjHxUzo6pDFtHW8TApRgIXDy0WfvIPv8ILJsbyBUt5xI
// LZp/KpOl5uxOp7vnis/WXImyBYk4wJT/P4ajttPpzi1IDSghWH+PLpMaOsLKSQuY
// XYm8IGBXAnCqs0EXfnN1ggu++QeEWyLqs8BrYB9Szzy9P0IZlhAAqbN2gLO1FhkJ
// 3FEwyZrYLQwJYdL0DHQpQAz3LDbKUT1Ds+V4tbBpCpzdpiNXldVzOtwT4nejhMAx
// iHvH5eajnkvlfPltWedu445ysCf31aFg1FBGcHP4u6RXb5f0O5+s3uxc+h9SgAQl
// TIMrbMrvyURM0FwQ5Pcw4pGuwjwsd9lxZs+bMYyJ7Mq/F1kJu4nuSfHkRSnEromE
// V4OLMSnTbGP9gCTATKk2Piq+TBKHAjy82DiP+dC03l6O97cOAL72ERcIWw6G/ufq
// 6GQyC2DBWOWIRJNMRytd8vcMtlxuNiKO6FP+66JljH2PcTqS4OkPOjS7m7pzoKgv
// H5aSnOVPYzjsBde5j39KvZ7RUqvn3qXDc2COW121ZbN5/25LKWhjkQ/ghE90ol8v
// GWBiAAkqscZ7V5118jN0LPWwsL7TX66eQbuvxeRurYiFDGbQuHrHJ6jEl+fQn6un
// 09aQMrVPw7N0lQPzVdOJ5zS9UfdvQhn7e5+JKvsw/PMXXpiBpLYu9o0pcWqpzocd
// JemLJ+4MSzUF/3egKh4lYaXP/KW/Toqik/nSs09TwFfUihBYHKIAIRG7kqZlAcqY
// Fza0r+2UfudKJC/YXKURWlBRqhyBmGnLR7FaENhJRuUx0HodhS7hpUe4NizDHBEj
// MLvmsAl+9utYVUh7kKo2ew/RGOJK46jHwwYEXKinxwEIANyOlbTaEHom0p+t7axy
// 6RT1ciqPd7EJGthQKT2M5EjBBNDvvrl+MQYa4uhe5D0Z6pGftRThnNzvD/tXXEsC
// qLEUxVa+ut0Bzzm/YwftEzop0oZliaWrMzLs1m1KUe5fh91PVBUCr+xmxuZzRb+a
// iYZHhqPjWvEvg9LHZpePdu+UpaNAqFkqY53y5C+zKAn1xOXAB1HsjDAgt3KOqzQl
// oLrIYFuGfT69pp1cJ+Td0zKhODK51zAUDmObimzJYHM2B4hO8b7jQrbftDVL8yEK
// UnzhaIdh8mxjtYBEQADWDF8ZBm/ohI/AYl4nk6rWzf9ecVH9ruh7ihpqAuQggU+s
// HuUAEQEAAf4JAwjv1DAPIrZI92CVzoNiBFzcjS2iC0oj9TcOSWO0y892U2f2Rc4y
// uDeAuxCnUYCQlzg5gk5jgLd7uWZ2bLg573T8WIi5zWILqrXT/GEuPV5IrsSse5C+
// rX5m3KCS1/kj9GTLDdYNwb3jR9VCLJJlvyH/ImunqEJ0Wq2UM4dmFxTz2lk8W1m3
// eF+jA86HLh/3dCLjvGLCM9wYW9KzRn1Qx88iMJLrXKS6GLJdXOXNqtFrWhEUjqrg
// kG6NKDIrmnODlpHLh7x0dX+05CmU65XYsTYh7ZbRl/yNs1meYyiFfpZd/r1qD1V2
// sWESKkxuu/2Vo9ND7A4GHD/9lybWGP3KO0IhQs9sCp21VgAWSrfoS1C9NeJsufAX
// jvlzkOgEJ6XQAsNEROZfrUgQtI5euz4ioEi1u5hXFg/jO8ddwnOg91cD7FmsBW+/
// /hXdk9Ybg0iJFSRKLnGxK4XwMceBiAUv0t/mZW4HLRIHFN6/RzTC9ED5lTUq1v9D
// nQJB9plEnzT10IXvLN7PUdF/nx6QwN780gyqRTGP/1YPtsA4Gc4/ofNBpzXYKV2G
// FOIv9whW7zJz7reEuzMdkis6yaqJjNpTvUTfj40+zp5qM3vhScU1aHAdl1ZGUkH3
// ue0m8tKgkcamqAmmrtaPb/XkfW+eYgKIUTpe4HHCMd0qibEmZkwx8MqtYOQ3FNUa
// gAC3FWYkFT2uyPj4yfuKRZxVNok+Gg6lnHHDjM6vWrVPigfSQXTsRk/7ZoJCY0Ts
// 0ZA8kGEAVfIJOzwC8ICAfEjDcFMzOZWcWONjI76O4CT5SH0ANBdotzVaoySX8j0G
// Z8msWF8ytRnfC/MVG4lM+KnaxXU99zIROa92B3L7/G5iaOOO3wAL9ESTKzDyRUIo
// bcs860MFQGTccwT40dr4BcrtJvGDGcaHKkaC3ikBGlvCwoQEGAEKAA8FAlyop8cF
// CQ8JnAACGy4BKQkQhfDjQ3KSa77AXSAEGQEKAAYFAlyop8cACgkQx88OchazfZ9x
// 2wgApGgsIMbWRHCfjNMZREO40SaMoJMAHiTwZwiRwdp/NFPAUl2yKCyrhT0mONzJ
// PI8V7BSgL5Kc3dF8YCCk+xWGw2UbWLYy3ne5n3MhIXLDZ9lkUYseABnCdocWPxzf
// Hi26rGxr+5HLBIrPeC66ErGErCTFNwTZhqKT1AXm/y5nBz8JRA/YU/17XU6Yk3DM
// rPyHJKdAyv7piUhXKD07/MLT+UpvYVs3of6TEzg3bG54lQwdXEfKhkjkyA3GfnWn
// 3/O7Qa1XJUMtEfM3N1fnv1/dBJyfQT/BeItsZwrkYpdNDYrilvPxM4FtDjF3xMpY
// ZggFeydUg25ViNdt8L/PN4l5Z9HVEACkv5OiiRrR0sBaljExqY+H9OrjVBfVC+Sj
// IkZvjWJGUxzXH+26t5t9HKiKm+ypwPpHZB1TH6JJd7Gr7BzQm/pmlyHWE3qhvWOz
// r7mKgkMVaODm6O0AqXmRDupEMfzJaULyqpaL3W4bjhAZgR1yHiczFeUk4mD8yyiq
// nTdCsIXYE0H9tXSIWfY5S+lRMJAc9CtVuIVUDOyL/HxYq5dIYUQGBWqCaNnDnfT1
// JzbhgXwIFFgt+EZSibw4Cu8uAO+5VVQC0xu1y7vpeKQWApKjY607p4eIdYQfmbdk
// C3tHUdkfHgZLMhcSR/0q7KE/kE6iawXGBuAQCkoTEpZ5Aei+lczgPC3X6FMfLTkR
// 1tZKjrMOGqx8LDICksdJAA2XDlUyKyxhogoajDMUPogAl7FO9ikKuyg11f+ss+36
// P8O0QrLMxGScKW5XktJ3kxw9SWNji4ISKDEHfSnLkrCXG9RRf8YqjZ6p4NvUH49r
// 4VIICthy7S8gqwbCn2dEXhEtoHH/7hfV9rd479XeQ0AJTybAsjYQWxOb+iYMotOr
// H1GGKl0equSOYQrj7VkV7jp37cizXhfQYytLkCXABoJbxOFUFMEcfrLTaH5fCSXI
// eZ4BetUjZ3/Fc6HbpdmYc5iBO3mGkOdl8kxwFouzBEZKRmAF0sF2MLMlBh0STdci
// qGVBKcbsvw==
// =wtmD
// -----END PGP PRIVATE KEY BLOCK-----`
// const passphrase = `code19` //what the privKey is encrypted with

//     const decrypt = async() => {
//     const privateKeyObject = await (OpenPGP.key.readArmored(privkey)).keys[0]
//     await privateKeyObject.decrypt(passphrase) 

//     const options = {
//       message: await OpenPGP.message.readArmored(testMessage),    
//       publicKeys: (await OpenPGP.key.readArmored(pubkey)).keys, 
//       privateKeys: [privateKeyObject]                                 
//     }

//     OpenPGP.decrypt(options).then(plaintext => {
//       console.log(plaintext.data)
//       return plaintext.data // 'Hello, World!'
//   })
//   }
//   decrypt();
}

  dismiss() {
    this.viewCtrl.dismiss();
  }
}

