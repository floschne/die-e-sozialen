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

public class CoordinateXML {
    @JacksonXmlElementWrapper(useWrapping = false)
    @JacksonXmlProperty(localName = "pos")
    private String coordinates;

    public Coordinates getCoordinates(){

        String[] parts = coordinates.split(" ");
        String part1 = parts[0];
        String part2 = parts[1];
        double longitude = Double.parseDouble(part1);
        double latitude = Double.parseDouble(part2);
        Coordinates coord = new Coordinates(longitude,latitude);

        return coord;
    }
}

