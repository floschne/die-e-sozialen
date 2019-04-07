package org.dieesozialen.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)

public class MapInformationShelter implements MapInformationInterface {
    @JacksonXmlProperty(localName = "id")
    private String id;
    @JacksonXmlProperty(localName = "bezeichnung")
    private String name;
    @JacksonXmlProperty(localName = "adresse")
    private String Strasse;
    @JacksonXmlProperty(localName = "stadtteil")
    private String Ort;
    @JacksonXmlProperty(localName = "maximale_kapazitaet")
    private String Web;
    @JacksonXmlProperty(localName = "betreuungsbeauftragter_hilfsorganisation")
    private String Extra1;
    @JacksonXmlProperty(localName = "betreuungsbeauftragter_ansprechpartner")
    private String Extra2;
    @JacksonXmlProperty(localName = "the_geom")
    @JacksonXmlElementWrapper(useWrapping = false)
    private Point geom;
}
