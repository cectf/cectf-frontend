# topkek-frontend

You need Python 3, pip, and npm installed to set up this project.

Navigate to the project repository and do this to set up the python virtual environment and enable it:

```
python3 -m venv venv
source venv/bin/activate
```

Installing the necessary Node dependencies:

```
npm install
```

Run `build.sh` to build the TypeScript bundles and compile the React files. The results should appear in `dist`.

Run `run.sh` to launch the Flask server to serve the frontend files. It is configured to run the server on `http:127.0.0.1:5000` by default.

Configuration can be done by adding variables to `instance/config.py`.

To generate an interactive dependency graph, run `webpack --profile --json > stats.json`, then upload `stats.json` to http://webpack.github.io/analyse/#modules. 
