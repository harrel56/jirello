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
import server.graphql.output.TaskOutput;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

public class WebTaskTest extends WebTest {

    @Value("classpath:web/task/create.graphql")
    Resource createRes;

    @Value("classpath:web/task/byId.graphql")
    Resource getRes;

    @Value("classpath:web/task/update.graphql")
    Resource updateRes;

    @Value("classpath:web/task/getAll.graphql")
    Resource getAllRes;

    @ParameterizedTest
    @CsvFileSource(resources = "/web/paramsGood.csv")
    void createUpdateAndGet(String title, String desc, String title2, String desc2) throws IOException {
        TaskOutput task = createTask(title, desc);
        getTaskById(task);
        task = updateTask(task.getId(), title2, desc2);
        getTaskById(task);
    }

    @ParameterizedTest
    @CsvFileSource(resources = "/web/paramsGood.csv")
    void createManyAndGet(String t1, String t2, String t3, String t4) throws IOException {
        List<TaskOutput> all = new ArrayList<>(4);
        all.add(createTask(t1, ""));
        all.add(createTask(t2, ""));
        all.add(createTask(t3, ""));
        all.add(createTask(t4, ""));

        getAll(all);
    }

    @ParameterizedTest
    @CsvFileSource(resources = "/web/paramsBad.csv")
    void createBad(String title, String desc) throws IOException {
        String body = String.format(resToString(createRes), title, desc, null);
        ResponseEntity<String> result = template.postForEntity(getURL(), body, String.class);
        assertEquals(HttpStatus.BAD_REQUEST, result.getStatusCode());
    }

    protected TaskOutput createTask(String title, String desc) throws IOException {
        return createTask(title, desc, null);
    }

    protected TaskOutput createTask(String title, String desc, String colId) throws IOException {
        String body = String.format(resToString(createRes), title, desc, colId);
        ResponseEntity<String> result = template.postForEntity(getURL(), body, String.class);
        assertEquals(HttpStatus.OK, result.getStatusCode());

        JsonNode node = unpack(result.getBody());
        TaskOutput out = new ObjectMapper().readValue(node.toString(), TaskOutput.class);
        assertFalse(StringUtils.isBlank(out.getId()));
        assertEquals(title, escaped(out.getTitle()));
        assertEquals(desc, escaped(out.getDescription()));
        assertEquals(colId, out.getColumn() == null ? null : quoted(out.getColumn().getId()));
        assertNull(out.getColumnId());
        return out;
    }

    protected void getTaskById(TaskOutput in) throws IOException {
        String body = String.format(resToString(getRes), in.getId());
        ResponseEntity<String> result = template.postForEntity(getURL(), body, String.class);
        assertEquals(HttpStatus.OK, result.getStatusCode());

        JsonNode node = unpack(result.getBody());
        TaskOutput out = new ObjectMapper().readValue(node.toString(), TaskOutput.class);
        assertThat(out).usingRecursiveComparison().isEqualTo(in);
    }

    protected TaskOutput updateTask(String id, String title2, String desc2) throws IOException {
        String body = String.format(resToString(updateRes), id, title2, desc2);
        ResponseEntity<String> result = template.postForEntity(getURL(), body, String.class);
        assertEquals(HttpStatus.OK, result.getStatusCode());

        JsonNode node = unpack(result.getBody());
        TaskOutput out = new ObjectMapper().readValue(node.toString(), TaskOutput.class);
        assertEquals(id, out.getId());
        assertEquals(title2, escaped(out.getTitle()));
        assertEquals(desc2, escaped(out.getDescription()));
        assertNull(out.getColumn());
        assertNull(out.getColumnId());

        return out;
    }

    void getAll(List<TaskOutput> all) throws IOException {
        ResponseEntity<String> result = template.postForEntity(getURL(), resToString(getAllRes), String.class);
        assertEquals(HttpStatus.OK, result.getStatusCode());

        JsonNode node = unpack(result.getBody());
        assertEquals(all.size(), node.size());

        for (TaskOutput in : all) {
            getTaskById(in);
        }
    }
}
