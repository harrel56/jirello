package server.graphql.fetcher;

import com.fasterxml.jackson.databind.ObjectMapper;
import graphql.schema.DataFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import server.model.Task;
import server.repo.TaskRepository;

@Service
public class TaskFetcher {

    @Autowired
    TaskRepository taskRepository;

    public DataFetcher<Task> getById() {
        return (env) -> {
            String id = env.getArgument("id");
            return taskRepository.findById(id).orElse(null);
        };
    }

    public DataFetcher<Task> createNew() {
        return (env) -> {
            Task task = new ObjectMapper().convertValue(env.getArgument("task"), Task.class);
            return taskRepository.save(task);
        };
    }
}
