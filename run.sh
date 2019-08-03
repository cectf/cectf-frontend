#!/bin/sh

source venv/bin/activate
export FLASK_APP=frontend
export FLASK_ENV=development
export FLASK_RUN_PORT=5000
flask run
