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

1. Make crypto usable (?)
2. Add a QR-code to be scanned for key-exchange
3. UI improvements
4. Social Feature / add Help Portal on interactive map