package org.dieesozialen.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import lombok.extern.slf4j.Slf4j;
import org.dieesozialen.entity.MapInformation;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.osgeo.proj4j.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.XMLStreamReader;

@Service
@Slf4j
public class MapApi {

    private static final String urlHospital = "http://archiv.transparenz.hamburg.de/hmbtgarchive/HMDK/hh_wfs_krankenhaeuser_760_snap_1_16559_snap_1.XML";
    private static final String urlShelter = "http://archiv.transparenz.hamburg.de/hmbtgarchive/HMDK/hh_wfs_notunterkuenfte_12578_snap_2.XML";

    private RestTemplate restTemplate;

    public MapApi() {}

    public List<MapInformation> getMapInformation(String type) throws IOException, XMLStreamException {
        List<MapInformation> infoList = new ArrayList<MapInformation>();
        if(type.equals("hospital")){
            //MapInformation info = new MapInformation(231,"UKE", new Coordinates(125.25,32165413.22),"Diese Straße","Jener Ort","DatWebAdress","ExtraN1","ExtraN2");
            //infoList.add(info);

            XMLInputFactory f = XMLInputFactory.newFactory();
            URL inputFile = new URL(urlHospital);
            XMLStreamReader sr = f.createXMLStreamReader(inputFile.openStream());

            XmlMapper mapper = new XmlMapper();
            //sr.next(); // to point to <root>
            //sr.next(); // to point to root-element under root
            //sr.next(); // to point to root-element under root
            while(sr.hasNext()){
                sr.next();
                if(sr.getEventType() == XMLStreamReader.START_ELEMENT && sr.getLocalName().equals("featureMember")){
                   //From here on cycly in on feature Memeber
                    sr.next();
                    MapInformation info = mapper.readValue(sr, MapInformation.class);
                    infoList.add(info);
                }
            }
            sr.close();
        }
        else if (type.equals("shelter")){
            //MapInformation info = new MapInformation("krankenhaus1","Studentenwohnheim", new Coordinates(125.25,32165413.22),"Diese Straße","Jener Ort","DatWebAdress","ExtraN1","ExtraN2");
           // infoList.add(info);
        }
        else{
            MapInformation info = new MapInformation();
            infoList.add(info);
        }
        return infoList;
    }

}

