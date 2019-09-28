# SCHHH19
Smart City Hackathon Hamburg 2019 - [https://hackathon.cadeia.org](https://hackathon.cadeia.org/)

## How to

### push your commits
1. create a new branch that will contain the commits you want to push
2. push your commits to that branch
3. create a pull request for that branch
4. wait for review or travis
5. when everything is ok: merge!

### install prerequisites for ubuntu 18.04 LTS
```
sudo apt install nodejs npm maven redis-server
sudo npm install -g ionic 
sudo service redis-server start
```

### build backend
```
cd backend && mvn clean install
```

### run backend
1. ```
   cd backend && mvn spring-boot:run
   ```
2. open [http://127.0.0.1:8080/](http://127.0.0.1:8080/)

### build and run frontend
```
cd frontend && npm install && ionic serve
```


## To Do

2. Add a QR-code to be scanned for key-exchange
4. Social Feature / add Help Portal on interactive map
5. Create splash-screen image -> Florian 
7. Make project ready to compile to iOS and Android (some version conflicts prevent that) -> Phil 
8. All together, please clean up the code you were working on -> All

## Done
1. Make crypto usable

6. Add Hilfe bieten delete button (delete offer from db with offer-id given by user)

3. UI improvements
- Edit dev-server config to use full cardova while development. 
- Add back button and fix init logic for hilfe anbieten modal in hilfe-bieten.ts
- Hilfe anbieten modal styling
- Message reader modal styling
- Fix message loading issues in nachrichten.ts 
- Add splashScreen animation on startup instead of showing a modal (only shows up in iOS and Android, not in Browser)

# Crypto Info:
- openpgp is scheiße!
- momentan funktioniert:
  1. einen Text nehmen, mit dem localen pub Key (wird generiert und im local storage abgelegt fals noch keiner vorhanden) verschlüsseln z.B. auf https://sela.io/pgp/de/
  2. Den Text in eine Mail c&p 
  3. Bei der Mail bei optionen-> deliver format-> plain/text only (ohne das hat es bei mir nicht geklappt)
  4. senden
  5. mail sollte nach etwas zeit in der app auftauchen und entschlüsselt angezeigt werden.
- Alles was nicht mit dem local Key entschlüsselt werden kann wird plain angezeigt.
- (Die localen keys werden in der Console gelogt, damit ihr die easy benutzen könnt zum testen)