package web;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoDatabase;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.test.context.ActiveProfiles;
import server.App;
import server.graphql.GraphQLInput;

import java.io.FileInputStream;
import java.io.IOException;

@SpringBootTest(classes = App.class, webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@ActiveProfiles("test")
public abstract class WebTest {

    @Autowired
    protected TestRestTemplate template;

    @Value("${spring.data.mongodb.database}")
    private String dbName;

    @Value("${server.url}:${server.port}/${graphql.endpoint}")
    private String URL;

    @BeforeEach
    void clearDB() {
        if ("jirelloDB".equals(dbName)) {
            throw new RuntimeException("fck yer boi");
        }
        MongoClient mongoClient = new MongoClient();
        MongoDatabase db = mongoClient.getDatabase(dbName);
        db.drop();
    }

    protected String getURL() {
        return URL;
    }

    protected static String resToString(Resource res) throws IOException {
        return new String(new FileInputStream(res.getFile()).readAllBytes());
    }

    protected ResponseEntity<String> executePost(String query) throws JsonProcessingException {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        GraphQLInput input = new GraphQLInput();
        input.setQuery(query);

        HttpEntity<String> entity = new HttpEntity<>(new ObjectMapper().writeValueAsString(input), headers);
        return template.exchange(getURL(), HttpMethod.POST, entity, String.class);
    }

    protected static JsonNode unpack(String response) throws JsonProcessingException {
        JsonNode node = new ObjectMapper().readTree(response);
        Assertions.assertEquals(node.size(), 1);
        return node.fields().next().getValue();
    }

    protected static String escaped(String in) {
        return in.replace("\\", "\\\\");
    }

    protected static String quoted(String in) {
        return "\"" + in + "\"";
    }

}
