package server;

import graphql.ExecutionResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import server.graphql.GraphQLProvider;

@RestController
public class MainController {

    @Autowired
    private GraphQLProvider graphQLProvider;

    @PostMapping("${graphql.endpoint}")
    public ResponseEntity<Object> graphQLQuery(@RequestBody String query) {
        ExecutionResult result = graphQLProvider.getGraphQL().execute(query);
        if (result.getErrors().isEmpty()) {
            return ResponseEntity.ok(result.getData());
        } else {
            return ResponseEntity.badRequest().body(result.getErrors());
        }
    }
}
