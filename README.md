# cectf-frontend

[![Build Status](https://travis-ci.com/cectf/cectf-frontend.svg?branch=master)](https://travis-ci.com/cectf/cectf-frontend)

The web client for the CECTF project.

cectf-frontend is written in Typescript and is built on React-Redux. Webpack is used to build the project.

## Installation

You need npm already installed to set up this project.

Run `npm install` to install all the dependencies required to build the project.

If the build ever fails while complaining about npx, run `npm install -g npx` to install npx globally.

## Building

The `build.sh` script is used to build the project. The results should appear in `dist`. It uses the npm build targets described below, and also copies static HTML and font files into `dist`.

Use `./build.sh dev` and `./build.sh prod` to run development and production builds, respectively. Development builds include source maps and human readable class names, while production builds are minified and obfuscated.

Run `npm run build-dev` to compile the project using the development webpack configuration (`webpack.dev.js`). Run `npm run build-prod` to compile the project using the production webpack configuration (`webpack.prod.js`). These builds will generate `dist/bundle.js` and `dist/main.css`. The development build will also generate source maps.

## Deploying

I use nginx to both host the frontend an the backend server in all of my development, test, and production environments.

To host the files directly from your workspace for testing, your nginx config should look something like this:

```
server {
    listen                80;
    server_name           localhost;
    charset               utf-8;
    client_max_body_size  75M;
    root                  /path/to/your/workspace/cectf-frontend/dist/;

    # Application server for cectf-server
    # See https://github.com/cectf/cectf-server for instructions
    location /api { try_files $uri @cectf_server; }
    location @cectf_server {
        include uwsgi_params;
        # Make sure this matches the uwsgi.ini value
        uwsgi_pass unix:/home/daniel/git/cectf-server/dev_deploy/cectf_server.sock;
    }

    # Required for challenge files to work
    location /files {
        alias /tmp/files;
    }

    # File server for cectf-frontend
    # This will serve all build files in cectf-frontend/dist
    location / {
        index index.html;
    }
}
```

## Releasing

This project is managed on [Travis CI](https://travis-ci.com/cectf/cectf-frontend). Commits to the `dev` are built and tested automatically. Commits to the `master` branch are built, tested, then uploaded to [Github Pages](https://github.com/cectf/cectf.github.io) where they can be publically accessed. I am looking into a more stable release option.

My production deployment pulls the files from [Github Pages](https://github.com/cectf/cectf.github.io) and builds them into a docker image which is then deployed on a cluster of Raspberry Pis.

## Tests

Run `npm test` to run the frontend unit tests. This should include a coverage report.

Tests cover the API, service, and redux layers. Each area requires a slightly different mocking setup and is kept in it's own directory.

Components are deliberately not tested and not included in the coverage report. All logic should be delegated to the service layer, so components should be strictly presentational. I consider the value of verifying the appearance of the components to be lower than the cost of maintaining and updating those tests, as the appearance is the least critical part of the app and the most subject to change. There is also the regression test suite, [cectf-test](https://github.com/cectf/cectf-test), which verifies the behavior of the components. If the app grows substantially or more contributors volunteer, this policy may be revisited.

Code coverage for all areas under test is currently 100%, so maintaining that standard is a requirement for any commits to master.

## Design

The project is layed out into 4 different functional areas: API, redux store, component, and service.

### API

The API layer provides a layer of abstraction over the fetch API and provides concise methods for accessing the [cectf-server](https://github.com/cectf/cectf-server) REST API. It automatically handles all CSRF tokens and does rudimentary error handling.

### Redux Store

[react-redux](https://react-redux.js.org/) is used to manage the state of the application. As in all redux applications, the overall state of the application is represented as a single object. The service layer dispatches atomic actions that are fed into the reducer, which mutates the state into it's next form. react-redux will then determine if a state change requires an update to any components, which will be updated and re-rendered automatically.

## Component

The components define the DOM structure and interactive elements of the application. The state stored in redux should be designed such that it can be translated efficiently into the component layer. The service layer is invoked in response to user interaction, such as clicks, keystrokes, or form submissions.

Closely related to the components is the SCSS styling. The SCSS files are compiled alongside the Typescript files so that the class names can be imported and referenced in the component files.

**NOTE**: There is currently a bug in the webpack plugin used to generate `*.scss.d.ts` files. When the build is run, the typescript is compiled, then the `*.scss.d.ts` are generated for each `*.scss` file. If a new SCSS file is added or a new field is added to an existing file, the typescript definition file will not be available at compile time, so the typescript build will fail. Running the build again will resolve the problem.

### Service

The service layer unites all the other layers. All business logic should live in this layer. As a general rule, other layers should use the service layer rather than interacting directly with eachother. Currently, the only exceptions are the react-redux bindings between the redux store and the components, and the API helper which looks up the CSRF token in the redux store so that it can be included on all requests.



To generate an interactive dependency graph, run `npx webpack --config webpack.prod.js --profile --json > stats.json`, then upload `stats.json` to http://webpack.github.io/analyse/#modules.
