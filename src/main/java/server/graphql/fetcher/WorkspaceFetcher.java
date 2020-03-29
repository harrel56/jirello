package server.graphql.fetcher;

import com.fasterxml.jackson.databind.ObjectMapper;
import graphql.GraphQLException;
import graphql.schema.DataFetcher;
import graphql.schema.DataFetchingEnvironment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import server.graphql.output.WorkspaceOutput;
import server.graphql.output.provider.WorkspaceProvider;
import server.graphql.tool.ObjectMerger;
import server.model.Workspace;
import server.repo.WorkspaceRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class WorkspaceFetcher {

    @Autowired
    private WorkspaceRepository workspaceRepository;

    @Autowired
    private ObjectMerger merger;

    public DataFetcher<WorkspaceOutput> getById() {
        return (env) -> getByIdImpl(env).map(this::toOutput).orElse(null);
    }

    public DataFetcher<List<WorkspaceOutput>> getAll() {
        return (env) -> {
            List<Workspace> all = workspaceRepository.findAll();
            return all.stream().map(this::toOutput).collect(Collectors.toList());
        };
    }

    public DataFetcher<WorkspaceOutput> createNew() {
        return (env) -> {
            Workspace workspace = new ObjectMapper().convertValue(env.getArgument("workspace"), Workspace.class);
            return toOutput(workspaceRepository.save(workspace));
        };
    }

    public DataFetcher<WorkspaceOutput> update() {
        return this::updateImpl;
    }

    private Optional<Workspace> getByIdImpl(DataFetchingEnvironment env) {
        String id = getIdArgument(env);
        if (id == null) {
            return Optional.empty();
        } else {
            return workspaceRepository.findById(id);
        }
    }

    private WorkspaceOutput updateImpl(DataFetchingEnvironment env) {
        Workspace model = getByIdImpl(env)
                .orElseThrow(() -> new GraphQLException(String.format("No workspace found for id=%s", env.getArgument("id").toString())));

        Workspace input = new ObjectMapper().convertValue(env.getArgument("workspace"), Workspace.class);
        merger.merge(input, model);
        workspaceRepository.save(model);
        return toOutput(model);
    }

    private String getIdArgument(DataFetchingEnvironment env) {
        WorkspaceProvider provider = env.getSource();
        if (provider == null) {
            return env.getArgument("id");
        } else {
            return provider.getWorkspaceId();
        }
    }

    private WorkspaceOutput toOutput(Workspace model) {
        return merger.merge(model, new WorkspaceOutput());
    }
}
