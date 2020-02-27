package server.graphql.tool;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.stereotype.Service;

import javax.validation.constraints.NotNull;
import java.beans.PropertyDescriptor;
import java.util.Arrays;

@Service
public class ObjectMerger {

    public final <T, U> U merge(@NotNull T input, @NotNull U output) {
        BeanUtils.copyProperties(input, output, getNullProperties(input));
        return output;
    }

    private <T> String[] getNullProperties(T input) {
        BeanWrapper obj = new BeanWrapperImpl(input);
        return Arrays.stream(obj.getPropertyDescriptors())
                .map(PropertyDescriptor::getName)
                .filter(prop -> obj.getPropertyValue(prop) == null)
                .toArray(String[]::new);
    }
}
