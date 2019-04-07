package org.dieesozialen.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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

public class HospitalXML {
    @JacksonXmlProperty(localName = "id")
    private String number;
    @JacksonXmlProperty(localName = "app:kh_nummer")
    private String number2;
}
