package org.dieesozialen.db.repos;

import org.dieesozialen.entity.OfferedHelp;
import org.springframework.data.repository.CrudRepository;

public interface HelpRepo extends CrudRepository<OfferedHelp, String> {
}
