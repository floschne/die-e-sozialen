package org.dieesozialen.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.osgeo.proj4j.*;

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
        double latEPSG = Double.parseDouble(part1);
        double lonEPSG = Double.parseDouble(part2);

        CRSFactory factory = new CRSFactory();
        CoordinateReferenceSystem srcCrs = factory.createFromName("EPSG:25832");
        CoordinateReferenceSystem outCrs = factory.createFromName("EPSG:4326");

        CoordinateTransform transformation = new BasicCoordinateTransform(srcCrs, outCrs);

        ProjCoordinate input = new ProjCoordinate(latEPSG, lonEPSG);
        ProjCoordinate result = new ProjCoordinate();
        transformation.transform(input, result);
        Coordinates coord = new Coordinates(result.x,result.y);
        return coord;
    }
}

