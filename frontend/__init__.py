import os

from flask import Flask


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

    # router for the bundles
    @app.route('/<string:zone>/<string:bundle>.js')
    def bundle(zone: str, bundle: str):
        try:
            with open("dist/" + zone + "/" + bundle + ".js", "r") as resource:
                return resource.read()
        except:
            return "Error reading bundle", 500

    # router for the bundle source maps
    @app.route('/<string:zone>/<string:bundle>.js.map')
    def bundle_source_map(zone: str, bundle: str):
        try:
            with open("dist/" + zone + "/" + bundle + ".js.map", "r") as resource:
                return resource.read()
        except:
            return "Error reading bundle map", 500

    # router for css resources
    @app.route('/<string:zone>/css/<path:path>')
    def css(zone: str, path: str):
        try:
            with open("dist/" + zone + "/css/" + path, "r") as resource:
                return resource.read()
        except:
            return "Error reading " + path, 500
        return "nope"

    # router for html resources
    @app.route('/<string:zone>/<path:path>')
    def html(zone: str, path: str):
        try:
            with open("dist/" + zone + "/html/" + path, "r") as resource:
                return resource.read()
        except:
            return "Error reading " + path, 500

    return app
