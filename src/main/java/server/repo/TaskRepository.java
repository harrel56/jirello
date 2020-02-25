package server.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import server.model.Task;

public interface TaskRepository extends MongoRepository<Task, String> {
}
