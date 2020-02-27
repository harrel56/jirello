package server.graphql.output;

public class ColumnOutput {

    private String id;
    private String title;

    public ColumnOutput() {
    }

    public ColumnOutput(String title) {
        this.title = title;
    }

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
}
