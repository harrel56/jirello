package server.graphql;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

public class GraphQLInput implements Serializable {
    String query;
    Map<String, Object> variables = new HashMap<>();

    public String getQuery() {
        return query;
    }

    public void setQuery(String query) {
        this.query = query;
    }

    public Map<String, Object> getVariables() {
        return variables;
    }

    public void setVariables(Map<String, Object> variables) {
        this.variables = variables;
    }
}
