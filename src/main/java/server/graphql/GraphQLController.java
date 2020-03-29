package server.graphql;

import graphql.ExecutionInput;
import graphql.ExecutionResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GraphQLController {

    @Autowired
    private GraphQLProvider graphQLProvider;

    @PostMapping("${graphql.endpoint}")
    public ResponseEntity<Object> graphQLQuery(@RequestBody GraphQLInput input) {
        ExecutionResult result = graphQLProvider.getGraphQL().execute(new ExecutionInput.Builder().query(input.query).variables(input.variables));
        if (result.getErrors().isEmpty()) {
            return ResponseEntity.ok(result.getData());
        } else {
            return ResponseEntity.badRequest().body(result.getErrors());
        }
    }

}
