package server.graphql.output;

import server.graphql.output.provider.ColumnProvider;

public class TaskOutput implements ColumnProvider {

    private String id;
    private String title;
    private String description;
    private String columnId;
    private ColumnOutput column;

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

    @Override
    public String getColumnId() {
        return columnId;
    }

    public void setColumnId(String columnId) {
        this.columnId = columnId;
    }

    public ColumnOutput getColumn() {
        return column;
    }

    public void setColumn(ColumnOutput column) {
        this.column = column;
    }
}
