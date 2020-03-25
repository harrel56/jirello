package server.graphql.output;

import java.util.ArrayList;
import java.util.List;

public class WorkspaceOutput {

    private String id;
    private String title;
    private String description;
    private List<ColumnOutput> columns = new ArrayList<>();

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<ColumnOutput> getColumns() {
        return columns;
    }

    public void setColumns(List<ColumnOutput> columns) {
        this.columns = columns;
    }
}
