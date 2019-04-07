package org.dieesozialen.service;

import org.dieesozialen.db.repos.AuthorityRepo;
import org.dieesozialen.entity.Address;
import org.dieesozialen.entity.Authority;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthorityService {

    private final AuthorityRepo authorityRepo;

    @Autowired
    public AuthorityService(AuthorityRepo authorityRepo) {
        this.authorityRepo = authorityRepo;

        /*
        please be aware that the following code is ugly hardcoded shit as fuck!
         */
        this.authorityRepo.deleteAll();

        this.authorityRepo.save(Authority.builder()
                .name("Suchtberatung der Behörde für Gesundheit und Verbraucherschutz")
                .description("Unter der angegebenen Telefonnummer werden Ihnen Beratungsstellen für alle Suchtbereiche in Ihrer Nähe genannt. Sie haben auch die Möglichkeit unter dem Link 'Rauschbarometer' selber nach Beratungsstellen zu suchen. Die Helpline zur Glücksspielsucht erreichen Sie unter: 040 23 93 44 44, in der Zeit Montags-Donnerstags 10.00-19.00 Uhr, Freitags 10.00-15.00 Uhr, zum Ortstarif.")
                .address(Address.builder()
                        .street("Billstraße 80")
                        .zip("20539")
                        .city("Hamburg")
                        .mail("drogenundsucht@bgv.hamburg.de")
                        .phoneNumber("+49 40 42837-2085")
                        .build()).build()
        );

        this.authorityRepo.save(Authority.builder()
                .name("Zentrale Anlaufstelle des Bundeskriminalamtes für durch rechtsextremistische Gewalt bedrohte Personen")
                .description("Die Zentrale Anlaufstelle des Bundeskriminalamtes ist rund um die Uhr unter folgender Telefonnummer zu erreichen +49 2225 - 8924240")
                .address(Address.builder()
                        .phoneNumber("+49 2225 8924240").build())
                .build()
        );

        this.authorityRepo.save(Authority.builder()
                .name("Hotline Schnelle Hilfen für gefährdete obdachlose Menschen in Hamburg")
                .description("BEI EINER AKUTEN GESUNDHEITLICHEN GEFÄHRDUNG DER PERSON IST SOFORT DIE FEUERWEHR UNTER 112 ZU INFORMIEREN. Eine akute Gefährdung bei obdachlosen Menschen liegt z.B. vor, wenn jemand sichtbare Wunden oder Verletzungen hat in Verbindung mit folgenden Merkmalen a)  nicht mehr alleine aufstehen kann, b) sich nicht verständlich machen kann, c) orientierungslos ist (weiß z.B. nicht mehr Zeit, Ort, Namen), d) stark alkoholisiert ist. Dies insbesondere im Winter. Die Hotline 'Schnelle Hilfen für gefährdete obdachlose Menschen in Hamburg' ist Montag bis Freitag von 8-16 Uhr erreichbar.")
                .address(Address.builder()
                        .street("Hamburger Straße 47")
                        .zip("22083")
                        .city("Hamburg")
                        .phoneNumber("+49 40 42828-5000")
                        .build()).build()
        );

        this.authorityRepo.save(Authority.builder()
                .name("Hotline für Kinder und Jugendliche bei Gewalt, Bedrohung, Mobbing und Erpressung")
                .description("Kinder und Jugendliche erhalten rund um die Uhr Beratung und Unterstützung, wenn sie unter Gewalt, Bedrohung, Mobbing oder Erpressung leiden oder wissen, dass ein anderes Kind oder ein anderer Jugendlicher davon betroffen ist.")
                .address(Address.builder()
                        .street("Feuerbergstraße 43")
                        .zip("22337")
                        .city("Hamburg")
                        .phoneNumber("+49 40 42815-3200")
                        .build()).build()
        );

        this.authorityRepo.save(Authority.builder()
                .name("Hilfe für Kriminalitätsopfer")
                .description("Bundesweites Info-Telefon und Opfer-Notruf 01803 34 34 34 (rund um die Uhr)")
                .address(Address.builder()
                        .street("Winterhuder Weg 31")
                        .zip("22085")
                        .city("Hamburg")
                        .phoneNumber("+49 40 2517680")
                        .mail("lbhamburg@weisser-ring.de")
                        .build()).build()
        );

        this.authorityRepo.save(Authority.builder()
                .name("Hilfetelefon Gewalt gegen Frauen")
                .description("Mit dem Hilfetelefon werden kostenlos Erstberatung und Informationen zu Hilfemöglichkeiten bei allen Formen von Gewalt gegen Frauen angeboten.\n" +
                        "Das Hilfetelefon wendet sich insbesondere an:\n" +
                        "\n" +
                        "Frauen, die von Gewalt betroffen sind\n" +
                        "Personen aus dem sozialen Umfeld von Frauen, die von Gewalt betroffen sind\n" +
                        "Personen, die bei ihrer beruflichen oder ehrenamtlichen Tätigkeit mit der Beratung und Unterstützung oder Intervention bei Gewalt gegen Frauen konfrontiert sind\n" +
                        "Das Angebot des Hilfetelefons ist barrierefrei und mehrsprachig. Die telefonische Beratung, Information und bei Bedarf Weitervermittlung an Unterstützungseinrichtungen vor Ort erfolgt durch qualifizierte weibliche Fachkräfte. Die Hilfeleistung erfolgt anonym und vertraulich.\n" +
                        "\n" +
                        "Hörgeschädigte oder Schwerhörige können kostenfrei einen Dolmetsch-Service in Anspruch nehmen, der das Gespräch mit den Mitarbeiterinnen des Hilfetelefons in Deutsche Gebärden- oder Schriftsprache übersetzt.")
                .address(Address.builder()
                        .street("Sibille-Hartmann-Straße 2-8")
                        .zip("50964")
                        .city("Köln")
                        .phoneNumber("+49 8000 116016")
                        .build()).build()
        );
    }

    public List<Authority> getAuthorities() {
        return (List<Authority>) this.authorityRepo.findAll();
    }

}
