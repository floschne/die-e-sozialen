package org.dieesozialen.service;


import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.repackaged.org.apache.commons.codec.binary.Base64;
import com.google.api.client.repackaged.org.apache.commons.codec.binary.StringUtils;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.gmail.Gmail;
import com.google.api.services.gmail.GmailScopes;
import com.google.api.services.gmail.model.ListMessagesResponse;
import com.google.api.services.gmail.model.Message;
import com.google.api.services.gmail.model.MessagePart;
import com.google.api.services.gmail.model.MessagePartHeader;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * based on https://developers.google.com/gmail/api/quickstart/java?refresh=1
 */
@Service
public class GMailService {
    private static final String APPLICATION_NAME = "e-sozialen";
    private static final JsonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();
    private static final String TOKENS_DIRECTORY_PATH = "tokens";

    /**
     * Global instance of the scopes required by this quickstart.
     * If modifying these scopes, delete your previously saved tokens/ folder.
     */
    private static final List<String> SCOPES = Collections.singletonList(GmailScopes.MAIL_GOOGLE_COM);
    private static final String CREDENTIALS_FILE_PATH = "/client.json";

    /**
     * Creates an authorized Credential object.
     *
     * @param HTTP_TRANSPORT The network HTTP Transport.
     * @return An authorized Credential object.
     * @throws IOException If the credentials.json file cannot be found.
     */
    private static Credential getCredentials(final NetHttpTransport HTTP_TRANSPORT) throws IOException {
        // Load client secrets.
        InputStream in = GMailService.class.getResourceAsStream(CREDENTIALS_FILE_PATH);
        GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(JSON_FACTORY, new InputStreamReader(in));

        // Build flow and trigger user authorization request.
        GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(
                HTTP_TRANSPORT, JSON_FACTORY, clientSecrets, SCOPES)
                .setDataStoreFactory(new FileDataStoreFactory(new java.io.File(TOKENS_DIRECTORY_PATH)))
                .setAccessType("offline")
                .build();
        LocalServerReceiver receiver = new LocalServerReceiver.Builder().setPort(8888).build();
        return new AuthorizationCodeInstalledApp(flow, receiver).authorize("user");
    }

    public List<org.dieesozialen.entity.Message> getMessages() throws GeneralSecurityException, IOException {
        // Build a new authorized API client service.
        final NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
        Gmail service = new Gmail.Builder(HTTP_TRANSPORT, JSON_FACTORY, getCredentials(HTTP_TRANSPORT))
                .setApplicationName(APPLICATION_NAME)
                .build();

        // authenticated user
        String user = "me";
        ListMessagesResponse listResponse = service.users().messages().list(user).execute();
        List<Message> messages = listResponse.getMessages();

        List<org.dieesozialen.entity.Message> results = new ArrayList<>();

        if (messages.isEmpty())
            return Collections.emptyList();
        else {
            for (Message m : messages) {
                org.dieesozialen.entity.Message msg = new org.dieesozialen.entity.Message();
                Message my = service.users().messages().get(user, m.getId()).setFormat("full").execute();
                MessagePart payload = my.getPayload();
                // get from, to, subject, date headers
                for (MessagePartHeader h : payload.getHeaders())
                    switch (h.getName()) {
                        case "From":
                            msg.setSender(h.getValue());
                            break;
                        case "To":
                            msg.setReceiver(h.getValue());
                            break;
                        case "Subject":
                            msg.setSubject(h.getValue());
                            break;
                        case "Date":
                            msg.setDate(h.getValue());
                            break;
                        default:
                            break;
                    }

                // build Message Body as a Plain Text
                if (payload.getParts() != null) {
                    StringBuilder sb = new StringBuilder();
                    for (MessagePart msgPart : payload.getParts())
                        if (msgPart.getMimeType().contains("text/plain"))
                            sb.append(new String(Base64.decodeBase64(msgPart.getBody().getData())));
                    msg.setContent(sb.toString());
                } else
                    msg.setContent(my.getSnippet());

                results.add(msg);
            }
        }

        return results;
    }
}

