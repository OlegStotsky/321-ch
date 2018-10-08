# 321-ch

[![CodeFactor](https://www.codefactor.io/repository/github/olegstotsky/321-ch/badge)](https://www.codefactor.io/repository/github/olegstotsky/321-ch)
[![Maintainability](https://api.codeclimate.com/v1/badges/9b6ed5565ad4ad54f27a/maintainability)](https://codeclimate.com/github/OlegStotsky/321-ch/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/OlegStotsky/321-ch/badge.svg?branch=master)](https://coveralls.io/github/OlegStotsky/321-ch?branch=master)
[![Build Status](https://travis-ci.com/OlegStotsky/321-ch.svg?branch=master)](https://travis-ci.com/OlegStotsky/321-ch)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

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

Go back to root directory:

`cd ..`

Generate production bundle:

`yarn run build-prod`

Run tests to verify that everything is working smoothly:

`yarn test`

Finally, start the project:

`yarn start`

Voila! Both api and content server are running on port 3000. Visit localhost:3000 to view the website.

## Contributing

1. Fork it ( https://github.com/olegStotsky/321-ch/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

## The MIT License (MIT)

Copyright (c) 2015 ID25

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.
