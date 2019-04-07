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
@RedisHash("help")
public class OfferedHelp {

    @Indexed
    private String id;

    private String title;
    private Person offerer;
    private String period;
    private String description;
}

