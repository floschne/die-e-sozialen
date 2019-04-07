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

public class MapInformation {
    @JacksonXmlProperty(localName = "id")
    private String id;
    @JacksonXmlProperty(localName = "name")
    private String name;
    @JacksonXmlProperty(localName = "strasse")
    private String Strasse;
    @JacksonXmlProperty(localName = "ort")
    private String Ort;
    @JacksonXmlProperty(localName = "homepage")
    private String Web;
    @JacksonXmlProperty(localName = "teilnahme_notversorgung")
    private String Extra1;
    @JacksonXmlProperty(localName = "teilnahme_geburtsklinik")
    private String Extra2;
    @JacksonXmlProperty(localName = "geom")
    @JacksonXmlElementWrapper(useWrapping = false)
    private Point geom;
}
