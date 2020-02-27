package server.graphql.fetcher;

import com.fasterxml.jackson.databind.ObjectMapper;
import graphql.GraphQLException;
import graphql.schema.DataFetcher;
import graphql.schema.DataFetchingEnvironment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import server.graphql.output.ColumnOutput;
import server.graphql.output.TaskOutput;
import server.graphql.tool.ObjectMerger;
import server.model.Task;
import server.repo.TaskRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TaskFetcher {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private ObjectMerger merger;

    public DataFetcher<TaskOutput> getById() {
        return (env) -> getByIdImpl(env).map(this::toOutput).orElse(null);
    }

    public DataFetcher<List<TaskOutput>> getAll() {
        return this::getAllImpl;
    }

    public DataFetcher<TaskOutput> createNew() {
        return this::createNewImpl;
    }

    public DataFetcher<TaskOutput> update() {
        return this::updateImpl;
    }

    private Optional<Task> getByIdImpl(DataFetchingEnvironment env) {
        String id = env.getArgument("id");
        return taskRepository.findById(id);
    }

    private List<TaskOutput> getAllImpl(DataFetchingEnvironment env) {
        ColumnOutput column = env.getSource();
        List<Task> tasks;
        if (column == null) {
            tasks = taskRepository.findAll();
        } else {
            tasks = taskRepository.findAll(Task.asExampleByColumnId(column.getId()));
        }
        return tasks.stream().map(this::toOutput).collect(Collectors.toList());
    }

    private TaskOutput createNewImpl(DataFetchingEnvironment env) {
        Task task = new ObjectMapper().convertValue(env.getArgument("task"), Task.class);
        return toOutput(taskRepository.save(task));
    }

    private TaskOutput updateImpl(DataFetchingEnvironment env) {
        Task model = getByIdImpl(env)
                .orElseThrow(() -> new GraphQLException(String.format("No task found for id=%s", env.getArgument("id").toString())));

        Task input = new ObjectMapper().convertValue(env.getArgument("task"), Task.class);
        merger.merge(input, model);
        taskRepository.save(model);
        return toOutput(model);
    }

    private TaskOutput toOutput(Task model) {
        return merger.merge(model, new TaskOutput());
    }
}
