package org.dieesozialen.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString

public class MapInformationHelp implements MapInformationInterface {

    private String id;
    private String Titel;
    private String Offerer;
    private String Period;
    private String Description;
    private String Strasse;
    private String Ort;
    private String Plz;

}
