# miro-table-app
Client-side of the Table app for Miro integration

## Debugging tool

https://kosy-software.github.io/kosy-debug-app/?url=https://kosy-software.github.io/miro-table-app/

## Create miro credentials
1. Follow the instructions on the Miro docs (https://developers.miro.com/docs/editable-boards-for-anonymous-users)
2. Request access to the Miro board picker api

## Create a settings file

In the root of the application, add a settings.json file:

```Typescript
{
    "miro": {
        "clientId": "The client id you got with following step 1 in 'Create miro credentials'",
        "jwtTokenUrl": "A URL to call 'create miro jwt token' on the Miro App Server"
    },
    "devServer": {
        "port": "The port you want the development server to run on (this needs to be the PORT of the url  you've whitelisted in 'Create google drive credentials' step 6)",
        "host": "The HOST you want the development server to run on (see 'Alias localhost')",
        "ssl": false | true | { 
            "certPath": "Path to the SSL certificate in PEM format",
            "keyPath": "(optiona) path to the certificate key", 
            "caPath": "(optional) path to the root certificate in PEM format"
        }
    }
}
```

## Install node package manager
To run the code, you'll need a bunch of packages installed. The package manger we've chosen to use is node package manager (npm).
1) Install npm on your local machine.
2) Check that npm is installed properly by running "npm --version" (without quotes). If you're on a windows machine and already have a command console open before the installation, you need to open a new command console before npm becomes available.
3) Install yarn by running "npm i -g yarn"
4) Run "yarn install" (without quotes). This will download all necessary packages into the node_modules folder.

## To actually run the code
If you've done all of the previous steps:

- Run "yarn start" (without quotes) to run the application in development mode.
- Run "yarn run build" (without quotes) to compile the application into the ./dist folder.
