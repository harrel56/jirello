package server.graphql.fetcher;

import com.fasterxml.jackson.databind.ObjectMapper;
import graphql.schema.DataFetcher;
import graphql.schema.DataFetchingEnvironment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import server.graphql.output.ColumnOutput;
import server.graphql.output.provider.ColumnProvider;
import server.graphql.tool.ObjectMerger;
import server.model.Column;
import server.repo.ColumnRepository;

@Service
public class ColumnFetcher {

    @Autowired
    private ColumnRepository columnRepository;

    @Autowired
    private ObjectMerger merger;

    public DataFetcher<ColumnOutput> getById() {
        return (env) -> {
            String id = getIdArgument(env);
            if (id == null) {
                return null;
            } else {
                return columnRepository.findById(id).map(this::toOutput).orElse(null);
            }
        };
    }

    public DataFetcher<ColumnOutput> createNew() {
        return (env) -> {
            Column column = new ObjectMapper().convertValue(env.getArgument("column"), Column.class);
            return toOutput(columnRepository.save(column));
        };
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
}
