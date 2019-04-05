# die-e-sozialen
Smart City Hackathon Hamburg 2019 - [https://hackathon.cadeia.org](https://hackathon.cadeia.org/)

## How to

### install prerequisites for ubuntu 18.04 LTS
```
sudo apt install nodejs npm maven
sudo npm install -g ionic 
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
