package server.graphql.fetcher;

import com.fasterxml.jackson.databind.ObjectMapper;
import graphql.schema.DataFetcher;
import graphql.schema.DataFetchingEnvironment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import server.graphql.output.ColumnOutput;
import server.graphql.output.WorkspaceOutput;
import server.graphql.output.provider.ColumnProvider;
import server.graphql.tool.ObjectMerger;
import server.model.Column;
import server.repo.ColumnRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ColumnFetcher {

    @Autowired
    private ColumnRepository columnRepository;

    @Autowired
    private ObjectMerger merger;

    public DataFetcher<ColumnOutput> getById() {
        return this::getByIdImpl;
    }

    public DataFetcher<List<ColumnOutput>> getAll() {
        return this::getAllImpl;
    }

    public DataFetcher<ColumnOutput> createNew() {
        return this::createNewImpl;
    }

    private String getIdArgument(DataFetchingEnvironment env) {
        ColumnProvider provider = env.getSource();
        if (provider == null) {
            return env.getArgument("id");
        } else {
            return provider.getColumnId();
        }
    }

    private ColumnOutput toOutput(Column model) {
        return merger.merge(model, new ColumnOutput());
    }

    private ColumnOutput getByIdImpl(DataFetchingEnvironment env) {
        String id = getIdArgument(env);
        if (id == null) {
            return null;
        } else {
            return columnRepository.findById(id).map(this::toOutput).orElse(null);
        }
    }

    private List<ColumnOutput> getAllImpl(DataFetchingEnvironment env) {
        WorkspaceOutput workspace = env.getSource();
        List<Column> tasks;
        if (workspace == null) {
            tasks = columnRepository.findAll();
        } else {
            tasks = columnRepository.findAll(Column.asExampleByWorkspaceId(workspace.getId()));
        }
        return tasks.stream().map(this::toOutput).collect(Collectors.toList());
    }

    private ColumnOutput createNewImpl(DataFetchingEnvironment env) {
        Column column = new ObjectMapper().convertValue(env.getArgument("column"), Column.class);
        return toOutput(columnRepository.save(column));
    }
}
