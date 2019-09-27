package org.dieesozialen.api.controller;


import io.swagger.annotations.Api;
import org.dieesozialen.api.respones.OfferHelpResponse;
import org.dieesozialen.api.respones.PlainStringResponse;
import org.dieesozialen.entity.Authority;
import org.dieesozialen.entity.MapInformationInterface;
import org.dieesozialen.entity.Message;
import org.dieesozialen.entity.OfferedHelp;
import org.dieesozialen.service.AuthorityService;
import org.dieesozialen.service.GMailService;
import org.dieesozialen.service.MapApi;
import org.dieesozialen.service.OfferHelpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.xml.stream.XMLStreamException;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/")
@Api(tags = "die-e-sozialen API", description = "REST API to access the Service!")
public class MainController {

    private final GMailService gMailService;
    private final AuthorityService authorityService;
    private final MapApi mapApi;
    private final OfferHelpService offerHelpService;

    @Autowired
    public MainController(GMailService gMailService,
                          AuthorityService authorityService,
                          MapApi mapApi,
                          OfferHelpService offerHelpService) {
        this.gMailService = gMailService;
        this.authorityService = authorityService;
        this.mapApi = mapApi;
        this.offerHelpService = offerHelpService;
    }

    /**
     * This does nothing but redirecting to the Swagger-UI
     */
    @RequestMapping(value = "/", method = RequestMethod.GET)
    void swaggerHome(HttpServletResponse response) throws IOException {
        response.sendRedirect("./swagger-ui.html");
    }

    /**
     * @return A shoutout to the world!
     */
    @RequestMapping(value = "/helloworld", method = RequestMethod.GET, produces = "application/json")
    public PlainStringResponse helloWorld() {
        return new PlainStringResponse("Hello world!");
    }

    /**
     * @param name the name as a string
     * @return A shoutout to the given name
     */
    @RequestMapping(value = "/hello", method = RequestMethod.POST)
    public String hello(@RequestBody String name) {
        return "Hello " + name + "!";
    }

    @RequestMapping(value = "/getMessages", method = RequestMethod.GET)
    public List<Message> getMessages() throws GeneralSecurityException, IOException {
        List<Message> res = new ArrayList<>();
        res.addAll(this.gMailService.getMessages());
        res.addAll(dummyMessages());
        return res;
    }

    @RequestMapping(value = "/getAuthorities", method = RequestMethod.GET)
    public List<Authority> getAuthorities() {
        return this.authorityService.getAuthorities();
    }

    /**
     * @return Coordinates of a map type
     */
    @RequestMapping(value = "/getMapContent", method = RequestMethod.GET, produces = "application/json")
    public List<MapInformationInterface> getMapContent(@RequestParam("type") String paramType) throws IOException, XMLStreamException {
        List<MapInformationInterface> info = this.mapApi.getMapInformation(paramType, this.offerHelpService);
        return info;
    }

    @RequestMapping(value = "/offerHelp", method = RequestMethod.POST)
    public OfferHelpResponse offerHelp(@RequestBody OfferedHelp help) {
        return new OfferHelpResponse(this.offerHelpService.offerHelp(help));
    }

    @RequestMapping(value = "/getHelp", method = RequestMethod.GET)
    public List<OfferedHelp> getHelp() {
        return this.offerHelpService.getHelp();
    }

    @RequestMapping(value = "/deleteHelp/{id}", method = RequestMethod.DELETE)
    public Boolean deleteHelp(@PathVariable String id) {
        return this.offerHelpService.deleteHelp(id);
    }

    @RequestMapping(value = "/flushHelp", method = RequestMethod.DELETE)
    public void flushHelp() {
        this.offerHelpService.flushHelp();
    }

    private List<Message> dummyMessages() {
        List<Message> messages = new ArrayList<>();

        messages.add(Message.builder()
                .sender("Job Center Hamburg-Mitte")
                .receiver("Ich")
                .subject("Termin am Donnerstag")
                .date("3. April 2019")
                .content("Hallo Mr. X! Bitte kommen Sie ran!")
                .build()
        );

        messages.add(Message.builder()
                .sender("Tafel Hamburg")
                .receiver("Ich")
                .subject("Am Montag gibts Falafel")
                .date("2. April 2019")
                .content("Hallo Frau Vensu! Lecker schmecker!")
                .build()
        );

        messages.add(Message.builder()
                .sender("Gesundheitsamt")
                .receiver("Ich")
                .subject("Rauchen tötet dich!")
                .date("1. April 2019")
                .content("Hallo Raucher!")
                .build()
        );

        messages.add(Message.builder()
                .sender("Bundeswehr")
                .receiver("Ich")
                .subject("Krieg ist doof!")
                .date("2. April 2019")
                .content("Akk sein!")
                .build()
        );

        return messages;
    }
}
