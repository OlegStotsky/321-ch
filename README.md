# 321-ch

[![CodeFactor](https://www.codefactor.io/repository/github/olegstotsky/321-ch/badge)](https://www.codefactor.io/repository/github/olegstotsky/321-ch)
[![BCH compliance](https://bettercodehub.com/edge/badge/OlegStotsky/321-ch?branch=master)](https://bettercodehub.com/)
[![Maintainability](https://api.codeclimate.com/v1/badges/9b6ed5565ad4ad54f27a/maintainability)](https://codeclimate.com/github/OlegStotsky/321-ch/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/OlegStotsky/321-ch/badge.svg?branch=master)](https://coveralls.io/github/OlegStotsky/321-ch?branch=master)
[![Build Status](https://travis-ci.com/OlegStotsky/321-ch.svg?branch=master)](https://travis-ci.com/OlegStotsky/321-ch)

## Demo
[Link](https://chan321ch.herokuapp.com/)

## About
321ch is an imageboard engine built using react and node.js.

## Technologies
    * Front End:
        * React
        * Redux
        * Typescript
        * SASS
        * Webpack
    * Back End:
        * Node.js
        * Express
        * Typescript
        * Mongoose, Mongod DB
    * Testing:
        * Jest
        * Sinon
        * Enzyme

## Requirements
You should have the latest version of mongodb and node.js installed on your machine. Mongodb is assumed to use the default port, username and password, but you can always change that in server/config/config.ts.

## Setting up and running
Install client dependencies:

`yarn install`

Move to server folder:

`cd server`

Install server dependencies:

`yarn install`

Run server:

`yarn run start`

Voila! Both api and content server are running on port 3000. Visit localhost:3000 to view the website.