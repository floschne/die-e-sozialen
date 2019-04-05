package org.dieesozialen.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@RedisHash("quote")
public class Quote {

    @Indexed
    private String id;

    private String type;
    private Value value;
}
