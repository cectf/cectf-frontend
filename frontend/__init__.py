import os

from flask import Flask, request, redirect
from frontend import auth


def read_resource(realm: str, path: str):
    if not auth.validate(realm):
        return redirect("/login")
    resourcePath = os.path.join("dist", realm, path)
    print(resourcePath)
    try:
        with open(resourcePath, "r") as resource:
            return resource.read()
    except FileNotFoundError:
        return "Resource not found", 404
    except:
        return "Error reading resource", 500


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    auth.init_app(app)

    # router for the bundles
    @app.route('/<string:realm>/<string:bundle>.js')
    def bundle(realm: str, bundle: str):
        return read_resource(realm, bundle + ".js")

    # router for the bundle source maps
    @app.route('/<string:realm>/<string:bundle>.js.map')
    def bundle_source_map(realm: str, bundle: str):
        return read_resource(realm, bundle + ".js.map")

    # router for css resources
    @app.route('/<string:realm>/css/<path:path>')
    def css(realm: str, path: str):
        return read_resource(realm, "css/" + path)

    # router for html index resources
    @app.route('/<string:realm>')
    def html(realm: str):
        allowedRealm = auth.get_realm_for_token()
        if realm != allowedRealm:
            return redirect("/" + allowedRealm)
        return read_resource(realm, "html/index.html")

    return app
