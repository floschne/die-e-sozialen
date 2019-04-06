package org.dieesozialen.service;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ObjectUtils;
import org.dieesozialen.entity.Coordinates;
import org.dieesozialen.entity.MapInformation;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class MapApi {

    private static final String urlHospital = "http://archiv.transparenz.hamburg.de/hmbtgarchive/HMDK/hh_wfs_krankenhaeuser_760_snap_1_16559_snap_1.XML";
    private static final String urlShelter = "http://archiv.transparenz.hamburg.de/hmbtgarchive/HMDK/hh_wfs_notunterkuenfte_12578_snap_2.XML";

    private RestTemplate restTemplate;

    public MapApi() {}

    public List<MapInformation> getMapInformation(String type) {
        List<MapInformation> infoList = new ArrayList<MapInformation>();
        if(type.equals("hospital")){
            MapInformation info = new MapInformation(231,"UKE", new Coordinates(125.25,32165413.22),"Diese Straße","Jener Ort","DatWebAdress","ExtraN1","ExtraN2");
            infoList.add(info);
        }
        else if (type.equals("shelter")){
            MapInformation info = new MapInformation(231,"Studentenwohnheim", new Coordinates(125.25,32165413.22),"Diese Straße","Jener Ort","DatWebAdress","ExtraN1","ExtraN2");
            infoList.add(info);
        }
        else{
            MapInformation info = new MapInformation();
            infoList.add(info);
        }
        return infoList;
        //return this.restTemplate.getForObject(URL, Quote.class);
    }

}

