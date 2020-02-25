package server.graphql;

import graphql.GraphQL;
import graphql.schema.GraphQLSchema;
import graphql.schema.idl.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;
import server.graphql.fetcher.TaskFetcher;

import javax.annotation.PostConstruct;
import java.io.IOException;

@Component
public class GraphQLProvider {

    private GraphQL graphQL;
    @Value("classpath:graphql/task.graphqls")
    private Resource schemaResource;

    @Autowired
    TaskFetcher taskFetcher;

    @PostConstruct
    public void createGraphQL() throws IOException {
        TypeDefinitionRegistry registry = new SchemaParser().parse(schemaResource.getFile());
        RuntimeWiring wiring = buildWiring();
        GraphQLSchema schema = new SchemaGenerator().makeExecutableSchema(registry, wiring);
        this.graphQL = GraphQL.newGraphQL(schema).build();
    }

    @Bean
    public GraphQL getGraphQL() {
        return graphQL;
    }

    private RuntimeWiring buildWiring() {
        return RuntimeWiring.newRuntimeWiring()
                .type(TypeRuntimeWiring.newTypeWiring("Query")
                        .dataFetcher("taskById", taskFetcher.getById()))
                .type(TypeRuntimeWiring.newTypeWiring("Mutation")
                        .dataFetcher("taskCreate", taskFetcher.createNew())
                ).build();
    }

}
