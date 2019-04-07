package org.dieesozialen.entity;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class Message {
    private String sender;
    private String receiver;
    private String subject;
    private String date;
    private String content;
}
