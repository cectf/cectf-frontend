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

## Tests

Run `npm test` to run the frontend unit tests. This should include a coverage report.

Tests cover the API, service, and redux layers. Each area requires a slightly different mocking setup and is kept in it's own directory.

Components are deliberately not tested and not included in the coverage report. All logic should be delegated to the service layer, so components should be strictly presentational. I consider the value of verifying the appearance of the components to be lower than the cost of maintaining and updating those tests, as the appearance is the least critical part of the app and the most subject to change. There is also the regression test suite, [cectf-test](https://github.com/cectf/cectf-test), which verifies the behavior of the components. If the app grows substantially or more contributors volunteer, this policy may be revisited.


Code coverage for all areas under test is currently 100%, so maintaining that standard is a requirement for any commits to master.

To generate an interactive dependency graph, run `npx webpack --config webpack.prod.js --profile --json > stats.json`, then upload `stats.json` to http://webpack.github.io/analyse/#modules.
