package org.dieesozialen.db.repos;

import org.dieesozialen.entity.Quote;
import org.springframework.data.repository.CrudRepository;

public interface QuoteRepo extends CrudRepository<Quote, String> {
}
