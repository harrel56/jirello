package server.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.domain.Example;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("columns")
public class Column {

    @Id
    private String id;
    private String title;
    private String workspaceId;

    public static Example<Column> asExampleByWorkspaceId(String id) {
        Column col = new Column();
        col.setWorkspaceId(id);
        return Example.of(col);
    }

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getWorkspaceId() {
        return workspaceId;
    }

    public void setWorkspaceId(String workspaceId) {
        this.workspaceId = workspaceId;
    }
}
