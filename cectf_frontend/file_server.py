import os
from flask import Response


def read_resource(path: str):
    resource_path = os.path.join("dist", path)
    if not os.path.isfile(resource_path):
        # try putting /index.html onto it if it's not a file
        resource_path = os.path.join(resource_path, "index.html")
    try:
        with open(resource_path, "r") as resource:
            if os.path.splitext(resource_path)[1] == ".css":
                return Response(resource.read(), content_type="text/css")
            return Response(resource.read())
    except FileNotFoundError:
        return "Resource not found", 404
    except:
        return "Error reading resource", 500


def init_app(app):

    @app.route('/<path:path>')
    def serve(path):
        return read_resource(path)

    @app.route('/')
    def serve_index():
        return read_resource("index.html")
