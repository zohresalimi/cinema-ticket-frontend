![Lint, Test, Build](https://github.com/zohresalimi/cinema-ticket-frontend/workflows/Lint,%20Test,%20Build/badge.svg?branch=master)
[![Netlify Status](https://api.netlify.com/api/v1/badges/5dcfc8c0-7382-49a6-a8f9-c2f53a30e918/deploy-status)](https://app.netlify.com/sites/frosty-raman-d9c6ad/deploys)

# CinemaTicket frontend

This site has been set up for cinemas screenings and movies premiering in cinemas. Online ticket booking is also one of the main goals of this website.

### Tech

we are useing a number of open source tools:

- [react] - A JavaScript library for building user interfaces
- [styled-components] - Visual primitives for the component age.
- [axios] - Promise based HTTP client for the browser and node.js.
- [i18n]- locale switching.
- [stripe]- Stripe’s APIs to accept payments.

### Installation

Clone the repository

```
$ git clone https://github.com/zohresalimi/cinema-ticket-frontend.git
```

Install all dependencies and start the project.

```sh
$ cd cinema-ticket-frontend
$ yarn
$ yarn start
```

Note: we used `yarn` to setup this project, however, if you want to use `npm` instead, do not forget to delete the `yarn.lock` file first.

### Setup

Eslint must be installed globally: `npm install -g eslint`

env variables are only available in node environment and not in the browser and we can access to them via `process.env.[VARIABLE_NAME]`

A `.env.sample` file is created at the root directory of the application. Just rename it to your environment name (ex. `.env.development`) and add corresponding values to the variables inside the file.

```
REACT_APP_BASE_URL=http://localhost:<your desired port>
REACT_APP_LOCAL_STORAGE_KEY=<a string which will be used to store data in localstorage>
REACT_APP_PUBLISHABLE_KEY=<your stripe credentioal>
```

### Icons

Icons made by [I'm an inline-style link](<a href="https://www.vectorstock.com/royalty-free-vector/play-media-cinema-simple-logo-template-icon-vector-24516644">Vector image by VectorStock / vectorstock</a>) from www.vectorstock.com
