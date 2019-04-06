package org.dieesozialen.api.controller;


import io.swagger.annotations.Api;
import org.dieesozialen.api.respones.PlainStringResponse;
import org.dieesozialen.db.repos.QuoteRepo;
import org.dieesozialen.entity.Authority;
import org.dieesozialen.entity.Message;
import org.dieesozialen.entity.Quote;
import org.dieesozialen.service.AuthorityService;
import org.dieesozialen.service.GMailService;
import org.dieesozialen.service.QuoteApi;
import org.dieesozialen.entity.MapInformation;
import org.dieesozialen.service.MapApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/")
@Api(tags = "die-e-sozialen API", description = "REST API to access the Service!")
public class MainController {

    private final QuoteApi quoteApi;
    private final QuoteRepo quoteRepo;
    private final GMailService gMailService;
    private final AuthorityService authorityService;
    private final MapApi mapApi;

    @Autowired
    public MainController(QuoteApi quoteApi, QuoteRepo quoteRepo, GMailService gMailService, AuthorityService authorityService, MapApi mapApi) {
        this.quoteApi = quoteApi;
        this.quoteRepo = quoteRepo;
        this.gMailService = gMailService;
        this.authorityService = authorityService;
        this.mapApi = mapApi;
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

    @RequestMapping(value = "/printQuote", method = RequestMethod.GET)
    public String printQuote() {
        Quote q = this.quoteApi.getQuote();
        this.quoteRepo.save(q);
        return q.toString();
    }

    @RequestMapping(value = "/showOldQuotes", method = RequestMethod.GET)
    public List<Quote> showOldQuotes() {
        return (List<Quote>) this.quoteRepo.findAll();
    }

    @RequestMapping(value = "/deleteOldQuotes", method = RequestMethod.DELETE)
    public void deleteOldQuotes() {
        this.quoteRepo.deleteAll();
    }


    @RequestMapping(value = "/getMessages", method = RequestMethod.GET)
    public List<Message> getMessages() throws GeneralSecurityException, IOException {
        return this.gMailService.getMessages();
    }

    @RequestMapping(value = "/getAuthorities", method = RequestMethod.GET)
    public List<Authority> getAuthorities() {
        return this.authorityService.getAuthorities();
    }

    /**
     * @return Coordinates of a map type
     */
    @RequestMapping(value = "/getMapContent", method = RequestMethod.GET, produces = "application/json")
    public List<MapInformation> getMapContent(@RequestParam("type") String paramType) {
        List<MapInformation> info = this.mapApi.getMapInformation(paramType);
        return info;
    }
}
