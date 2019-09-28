package org.dieesozialen.service;

import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import lombok.extern.slf4j.Slf4j;

import org.dieesozialen.entity.MapInformationHelp;
import org.dieesozialen.entity.MapInformationHospital;
import org.dieesozialen.entity.MapInformationInterface;
import org.dieesozialen.entity.MapInformationShelter;
import org.dieesozialen.entity.OfferedHelp;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

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

    public MapApi() {
        this.restTemplate = new RestTemplate();
    }

    public List<MapInformationInterface> getMapInformation(String type, OfferHelpService help) throws IOException, XMLStreamException {
        List<MapInformationInterface> infoList = new ArrayList<MapInformationInterface>();
        if(type.equals("hospital")){
            XMLInputFactory f = XMLInputFactory.newFactory();
            URL inputFile = new URL(urlHospital);
            XMLStreamReader sr = f.createXMLStreamReader(inputFile.openStream());

            XmlMapper mapper = new XmlMapper();
            while(sr.hasNext()){
                sr.next();
                if(sr.getEventType() == XMLStreamReader.START_ELEMENT && sr.getLocalName().equals("featureMember")){
                   //From here on cycly in on feature Memeber
                    sr.next();
                    MapInformationHospital info = mapper.readValue(sr, MapInformationHospital.class);
                    infoList.add(info);
                }
            }
            sr.close();
        }
        else if (type.equals("shelter")){
            XMLInputFactory f = XMLInputFactory.newFactory();
            URL inputFile = new URL(urlShelter);
            XMLStreamReader sr = f.createXMLStreamReader(inputFile.openStream());

            XmlMapper mapper = new XmlMapper();
            while(sr.hasNext()){
                sr.next();
                if(sr.getEventType() == XMLStreamReader.START_ELEMENT && sr.getLocalName().equals("featureMember")){
                    //From here on cycly in on feature Memeber
                    sr.next();
                    MapInformationShelter info = mapper.readValue(sr, MapInformationShelter.class);
                    infoList.add(info);
                }
            }
            sr.close();
        }        
        else if (type.equals("help")){
            
            List<OfferedHelp> helplist = help.getHelp();
             
            for(OfferedHelp elem : helplist){
               
                MapInformationHelp info = new MapInformationHelp();
                info.setId(elem.getId());
                info.setTitel(elem.getTitle());
                info.setDescription(elem.getDescription());
                info.setPeriod(elem.getPeriod());
                info.setOfferer(elem.getOfferer().getForename() + " " + elem.getOfferer().getSurname());
                info.setStrasse(elem.getOfferer().getAddress().getStreet());
                info.setPlz(elem.getOfferer().getAddress().getZip());
                info.setOrt(elem.getOfferer().getAddress().getCity());
                infoList.add(info);      
            }
        }
        else{
            MapInformationHospital info = new MapInformationHospital();
            infoList.add(info);
        }
        return infoList;
    }

}

