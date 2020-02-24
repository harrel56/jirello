package server;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import server.orm.Task;
import server.repo.TaskRepository;

@RestController
public class MainController {

    @Autowired
    private TaskRepository taskRepository;

    @PostMapping("${graphql.endpoint}")
    public ResponseEntity graphQLQuery(@RequestBody String query) {

        taskRepository.save(new Task("t1", "d1"));
        return ResponseEntity.ok("eldo");
    }
}
