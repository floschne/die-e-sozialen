package org.dieesozialen.service;

import org.dieesozialen.db.repos.HelpRepo;
import org.dieesozialen.entity.OfferedHelp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OfferHelpService {

    private final HelpRepo helpRepo;

    @Autowired
    OfferHelpService(HelpRepo helpRepo) {
        this.helpRepo = helpRepo;
    }

    public String offerHelp(OfferedHelp help) {
        return this.helpRepo.save(help).getId();
    }

    public Boolean deleteHelp(String id) {
        if (this.helpRepo.findById(id).isPresent()) {
            this.helpRepo.deleteById(id);
            return true;
        } else return false;
    }

    public List<OfferedHelp> showHelp() {
        return (List<OfferedHelp>) this.helpRepo.findAll();
    }
}
