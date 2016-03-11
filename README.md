# Roomies-Backend
Backend service for [Roomies Android App](https://github.com/MunazR/Roomies-Android).

## Description
Roomies is an Android application for roommates. It allows users to create, manage and add roommates to their group. They can then create chores for each member, track expenses and keep a list of pantry items. Users can sign up using their Facebook login.

## Server
Roomies backend was developed using Node.js. To run the server locally edit the configuration file [here](https://github.com/MunazR/Roomies-Backend/blob/master/config.json) with your own credentials. Then use the following commands to start the server: 

```sh
npm install 
npm start

> roomies-backend@1.0.0 start C:\Users\munaz\Desktop\Roomies-Backend
> node server.js

Starting server on port: 8080
```
Roomies uses the following key Node packages
+ bluebird
+ express
+ mongoose
