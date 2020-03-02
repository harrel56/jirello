package server.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.domain.Example;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("tasks")
public class Task {

    @Id
    private String id;
    private String title;
    private String description;
    private String columnId;

    public String getId() {
        return id;
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

    public String getColumnId() {
        return columnId;
    }

    public void setColumnId(String columnId) {
        this.columnId = columnId;
    }

    public static Example<Task> asExampleByColumnId(String columnId) {
        Task task = new Task();
        task.setColumnId(columnId);
        return Example.of(task);
    }
}
