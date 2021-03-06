package org.dieesozialen.entity;

import lombok.*;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@RedisHash("authority")
public class Authority {

    @Indexed
    private String id;

    private String name;
    private String description;

    private Address address;
}
