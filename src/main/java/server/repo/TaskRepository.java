package server.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import server.orm.Task;

public interface TaskRepository extends MongoRepository<Task, String> {
}
