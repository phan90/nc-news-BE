# **Northcoders News API**
This project is a back end API built to view the Northcoders news database which is made up of articles, topics and users and comments.

This API was created with Node.js, Express.js and MongoDB serving the database.

The link below displays all of the available **API Endpoints**
https://ncnewss.herokuapp.com/

## **Getting Started**
To begin fork and clone this repository.

## **Prerequisites**
You will need the following:
 * **[Node.js](https://nodejs.org/en/)** v9.11.1
 * **[MongoDB](https://www.mongodb.com/)** v3.6.1
 * **[Express](https://expressjs.com/)**

### **Node**

**[Node](http://nodejs.org/)** is really easy to install and now includes **[NPM](https://npmjs.org/)**.
You should be able to run the following command after the installation procedure
below.
```
node --version
v9.11.1

npm --version
v5.7.1
```
#### Node installation on OS X

You will need to use a Terminal. On OS X, you can find the default terminal in
`/Applications/Utilities/Terminal.app`.

Please install **[Homebrew](http://brew.sh/)** if it's not already done with the following command.
```
ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"
```

If everything is fine, you should run
```
brew install node
```

#### Node installation on Linux
```
sudo apt-get install python-software-properties
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install nodejs
```
#### Node installation on Windows

Just go on **[official Node.js website](http://nodejs.org/)** & grab the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it.

### **MongoDB**

Now for MongoDB, a database we'll be using.
MongoDB is the technology used for the database management. 
The **[Mongoose](http://mongoosejs.com/)** node plugin is used to manage our database operations.

Install mongo:
```
brew install mongo
```

Check mongo is working by running:
```
mongod
```
---

Note: You will need to create a config folder for test and development with an index file which will recieve the correct DB_URL and dataPath depending on the node environment. This code can be used in the index file:

```
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
module.exports = require(`./${process.env.NODE_ENV}`)
```

---

## **Installing**
Install dependencies:
```
npm install
```
*Some packages usages might change so you should run `npm install` often.*

Open up another terminal and run MongoDB to start serving the database:
```
mongod
```
You should now have two terminals open, return back to terminal on the projects folder level and seed the database with the command:
```
npm run seed:dev

npm run seed:test
```
Run the server locally:
```
npm run dev
```

The server should be accesible in any browser or **[Postman](https://www.getpostman.com)** on http://localhost:3000 

## **Testing**
A full test suite is included in the spec folder which has been written using Chai, Supertest and Mocha
To run the test:
```
npm t
```

## Authors
[Karen Phan](https://github.com/phan90)

## Acknowledgements
[Northcoders](https://northcoders.com)

