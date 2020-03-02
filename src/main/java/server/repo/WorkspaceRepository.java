package server.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import server.model.Workspace;

public interface WorkspaceRepository extends MongoRepository<Workspace, String> {
}
