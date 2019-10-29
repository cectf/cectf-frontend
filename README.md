# cectf-frontend

[![Build Status](https://travis-ci.com/cectf/cectf-frontend.svg?branch=master)](https://travis-ci.com/cectf/cectf-frontend)

You need Python 3, pip, npm, and npx installed to set up this project.

Navigate to the project repository and run `./setup_workspace.sh`. This will set up the python virtual environment, install the python dependencies, and install the npm dependencies.

Run `./build.sh` to build the TypeScript bundles and compile the React files. The results should appear in `dist`. If build fails while complaining about npx, run `npm install -g npx` to install npx globally.

Run `npm test` to run the frontend tests.

Configuration of the flask server can be done by adding variables to `instance/config.py`.

To generate an interactive dependency graph, run `npx webpack --config webpack.prod.js --profile --json > stats.json`, then upload `stats.json` to http://webpack.github.io/analyse/#modules.
