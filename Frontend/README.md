# Frontend - Client App

The Frontend App allows user to search for stores and perform booking operations. It can be targeted for different environments, bellow there's information on how to install and build.

### Install the NodeJS dependencies

```bash
npm install
```

### Install Quasar CLI Globally

Quasar CLI might be useful to add new available packages and build operations. To do such:

```bash
sudo npm install -g @quasar/cli
```

### Start as a Web App (hot-code reloading, error reporting, etc.)

If the App has been successfully built, a new webpage will be opened with the Default Browser.

```bash
quasar dev
```

### Start App with Mobile Simulator

In order to run the App targeted for a mobile simulator, Cordova and a Simulator must be installed

#### Install Cordova Globally

```bash
sudo npm install -g cordova
```

### Run for iOS

````bash
quasar dev -m ios
````

### Run for Android

```bash
quasar dev -m android
```



### Build the App for Production

* Browser

```bash
quasar build 
```

* iOS

```bash
quasar build -m ios
```

* Android

```bash
quasar build -m android
```



## Customize the Configuration

See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).

## Quasar Documentation

See [Quasar Dev](https://quasar.dev/introduction-to-quasar)