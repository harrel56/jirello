package server.graphql.fetcher;

import com.fasterxml.jackson.databind.ObjectMapper;
import graphql.schema.DataFetcher;
import graphql.schema.DataFetchingEnvironment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import server.graphql.output.WorkspaceOutput;
import server.graphql.output.provider.WorkspaceProvider;
import server.graphql.tool.ObjectMerger;
import server.model.Workspace;
import server.repo.WorkspaceRepository;

@Service
public class WorkspaceFetcher {

    @Autowired
    private WorkspaceRepository workspaceRepository;

    @Autowired
    private ObjectMerger merger;

    public DataFetcher<WorkspaceOutput> getById() {
        return (env) -> {
            String id = getIdArgument(env);
            if (id == null) {
                return null;
            } else {
                return workspaceRepository.findById(id).map(this::toOutput).orElse(null);
            }
        };
    }

    public DataFetcher<WorkspaceOutput> createNew() {
        return (env) -> {
            Workspace workspace = new ObjectMapper().convertValue(env.getArgument("workspace"), Workspace.class);
            return toOutput(workspaceRepository.save(workspace));
        };
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
