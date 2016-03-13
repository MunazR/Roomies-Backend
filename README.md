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

## License
The MIT License (MIT)

Copyright (c) 2016 Munaz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
