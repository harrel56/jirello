package web;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.platform.commons.util.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import server.graphql.output.TaskOutput;

import java.io.IOException;

public class WebTaskTest extends WebTest {

    @Value("${graphql.queries-location}/task/create.graphql")
    Resource createRes;

    @Test
    void createOne() throws IOException {
        String title = "Titlesosos";
        String desc = "descososdldldl";
        String body = String.format(resToString(createRes), title, desc);
        ResponseEntity<String> result = template.postForEntity(getURL(), body, String.class);
        Assertions.assertEquals(result.getStatusCode(), HttpStatus.OK);

        JsonNode node = unpack(result.getBody());
        TaskOutput task = new ObjectMapper().readValue(node.toString(), TaskOutput.class);
        Assertions.assertFalse(StringUtils.isBlank(task.getId()));
        Assertions.assertEquals(task.getTitle(), title);
        Assertions.assertEquals(task.getDescription(), desc);
    }
}
