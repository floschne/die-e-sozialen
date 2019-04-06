package org.dieesozialen.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString

public class MapInformation {
    private Integer id;
    private String name;
    private Coordinates coordinates;
    private String Strasse;
    private String Ort;
    private String Web;
    private String Extra1;
    private String Extra2;
}
