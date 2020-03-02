package web;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvFileSource;
import org.junit.platform.commons.util.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import server.graphql.output.ColumnOutput;
import server.graphql.output.TaskOutput;

import java.io.IOException;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

public class WebColumnTest extends WebTaskTest {

    @Value("classpath:web/column/create.graphql")
    Resource createRes;

    @Value("classpath:web/column/byId.graphql")
    Resource getRes;

    @ParameterizedTest
    @CsvFileSource(resources = "/web/paramsGood.csv")
    void createAndGet(String title) throws IOException {
        ColumnOutput col = create(title);
        getById(col);
    }

    @ParameterizedTest
    @CsvFileSource(resources = "/web/paramsBad.csv")
    void createBad(String title) throws IOException {
        String body = String.format(resToString(createRes), title);
        ResponseEntity<String> result = template.postForEntity(getURL(), body, String.class);
        assertEquals(HttpStatus.BAD_REQUEST, result.getStatusCode());
    }

    @ParameterizedTest
    @CsvFileSource(resources = "/web/paramsGood.csv")
    void createLinkTasksAndGet(String title, String desc) throws IOException {
        ColumnOutput col = create(title);
        TaskOutput task = createTask(title, desc, quoted(col.getId()));
        TaskOutput task2 = createTask(title, desc, quoted(col.getId()));
        col.getTasks().add(task);
        col.getTasks().add(task2);
        getTaskById(task);
        getTaskById(task2);
        getById(col);
    }

    ColumnOutput create(String title) throws IOException {
        String body = String.format(resToString(createRes), title);
        ResponseEntity<String> result = template.postForEntity(getURL(), body, String.class);
        assertEquals(HttpStatus.OK, result.getStatusCode());

        JsonNode node = unpack(result.getBody());
        ColumnOutput out = new ObjectMapper().readValue(node.toString(), ColumnOutput.class);
        assertFalse(StringUtils.isBlank(out.getId()));
        assertEquals(title, escaped(out.getTitle()));
        assertNotNull(out.getTasks());
        assertTrue(out.getTasks().isEmpty());
        return out;
    }

    void getById(ColumnOutput in) throws IOException {
        String body = String.format(resToString(getRes), in.getId());
        ResponseEntity<String> result = template.postForEntity(getURL(), body, String.class);
        assertEquals(HttpStatus.OK, result.getStatusCode());

        JsonNode node = unpack(result.getBody());
        ColumnOutput out = new ObjectMapper().readValue(node.toString(), ColumnOutput.class);
        assertThat(out).usingRecursiveComparison().isEqualTo(in);
    }
}
