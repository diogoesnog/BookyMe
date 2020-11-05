# Notifications Microservice

## Running the Application

There are several steps in order to start this server. First off, it is important to install all dependencies defined under package JSON file. To do such, run the following command in your terminal

```
$ npm install
```

After a successful installation of all node packages, you can run the server under two different environments

### Run Server in Production Mode

You need to restart your server every time changes have been change in order to be applied. All your logs will be hidden by default.

```
$ npm start
```

### Run Server in development mode

Route requests will be displayed for debugging purposes and every time your changes have been saved the server restarts 

```
$ npm test
````

### Running with Docker

Coming soon... 

<!-- You can also run the API Server as a microservice by using Docker, with very few steps

Go to the same directory as Dockerfile and build an image
$ docker build -t mantis-backend .
Run the image
$ docker run -p mantis-backend
This server, unlike the previous chapter, will always run on production mode.-->
