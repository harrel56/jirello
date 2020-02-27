package server.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import server.model.Column;

public interface ColumnRepository extends MongoRepository<Column, String> {
}
