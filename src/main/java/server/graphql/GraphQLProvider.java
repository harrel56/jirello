package server.graphql;

import graphql.GraphQL;
import graphql.schema.GraphQLSchema;
import graphql.schema.idl.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;
import server.graphql.fetcher.ColumnFetcher;
import server.graphql.fetcher.TaskFetcher;

import javax.annotation.PostConstruct;
import java.io.IOException;

@Component
public class GraphQLProvider {

    private GraphQL graphQL;

    @Value("${graphql.schema-location}/schema.graphqls")
    private Resource schemaResource;
    @Value("${graphql.schema-location}/task.graphqls")
    private Resource taskResource;
    @Value("${graphql.schema-location}/column.graphqls")
    private Resource columnResource;

    @Autowired
    private TaskFetcher taskFetcher;

    @Autowired
    private ColumnFetcher columnFetcher;

    @Bean
    public GraphQL getGraphQL() {
        return graphQL;
    }

    @PostConstruct
    private void createGraphQL() throws IOException {
        TypeDefinitionRegistry registry = buildTypeRegistry();
        RuntimeWiring wiring = buildWiring();
        GraphQLSchema schema = new SchemaGenerator().makeExecutableSchema(registry, wiring);
        this.graphQL = GraphQL.newGraphQL(schema).build();
    }

    private RuntimeWiring buildWiring() {
        return RuntimeWiring.newRuntimeWiring()
                .type(TypeRuntimeWiring.newTypeWiring("Query")
                        .dataFetcher("taskById", taskFetcher.getById())
                        .dataFetcher("columnById", columnFetcher.getById()))
                .type(TypeRuntimeWiring.newTypeWiring("Mutation")
                        .dataFetcher("taskCreate", taskFetcher.createNew())
                        .dataFetcher("taskUpdate", taskFetcher.update())
                        .dataFetcher("columnCreate", columnFetcher.createNew()))
                .type(TypeRuntimeWiring.newTypeWiring("Task")
                        .dataFetcher("column", columnFetcher.getById())
                ).build();
    }

    private TypeDefinitionRegistry buildTypeRegistry() throws IOException {
        SchemaParser parser = new SchemaParser();
        return parser.parse(schemaResource.getFile())
                .merge(parser.parse(taskResource.getFile()))
                .merge(parser.parse(columnResource.getFile()));
    }

}
