package server.graphql.output;

import server.graphql.output.provider.WorkspaceProvider;

import java.util.ArrayList;
import java.util.List;

public class ColumnOutput implements WorkspaceProvider {

    private String id;
    private String title;
    private List<TaskOutput> tasks = new ArrayList<>();
    private String workspaceId;
    private WorkspaceOutput workspace;

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

    public List<TaskOutput> getTasks() {
        return tasks;
    }

    public void setTasks(List<TaskOutput> tasks) {
        this.tasks = tasks;
    }

    @Override
    public String getWorkspaceId() {
        return workspaceId;
    }

    public void setWorkspaceId(String workspaceId) {
        this.workspaceId = workspaceId;
    }

    public WorkspaceOutput getWorkspace() {
        return workspace;
    }

    public void setWorkspace(WorkspaceOutput workspace) {
        this.workspace = workspace;
    }
}
