package org.dieesozialen.service;

import lombok.extern.slf4j.Slf4j;
import org.dieesozialen.entity.Quote;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@Slf4j
public class QuoteApi {

    private static final String URL = "https://gturnquist-quoters.cfapps.io/api/random";

    private RestTemplate restTemplate;

    public QuoteApi() {
        this.restTemplate = new RestTemplate();
    }

    public Quote getQuote() {
        return this.restTemplate.getForObject(URL, Quote.class);
    }

}
