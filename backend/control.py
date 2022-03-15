# Keep it simple stupid.
import json

from flask import Flask, request, Response
import requests
import os
import re
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
mitmapps_dir = './mitmapps'
certs_dir = './certs'

APP_LIST_LIMIT = 9000


def get_installed_apps():
    apps = os.listdir(mitmapps_dir)
    app_objects = []
    for application in apps:
        if '.py' in application:
            app_objects.append({
                'name': application,
                'python': open(os.path.join(mitmapps_dir, application)).read()
            })
    return app_objects


def create_error_message(error_type, detail):
    return error_type + detail


def create_success_message(detail):
    return detail


def validate_app_id(app_id):
    if len(app_id) < 4:
        return False
    if app_id[-3:] != '.py':
        return False
    # returns true if valid
    return bool(re.match('^[a-zA-Z0-9_.-]*$', app_id))


@app.route('/installed/apps', methods=['GET'])
def list_apps():
    # return the list of currently installed apps.
    return Response(json.dumps(get_installed_apps()), content_type='application/json')


@app.route('/installed/apps', methods=['POST'])
def install_app():
    desired_app = request.json

    if validate_app_id(desired_app['name']):
        with open(os.path.join(mitmapps_dir, desired_app['name']), 'w+') as f:
            f.write(desired_app['python'])
    else:
        return 'error, invalid app name', 400

    return Response(json.dumps(get_installed_apps()), content_type='application/json')


@app.route('/installed/apps', methods=['DELETE'])
def delete_app():
    desired_app = request.json
    current_app_list = get_installed_apps()
    current_app_names = set(a['name'] for a in current_app_list)

    if desired_app['name'] not in current_app_names:
        return 'error, app not installed', 400

    os.remove(os.path.join(mitmapps_dir, desired_app['name']))

    return Response(json.dumps(get_installed_apps()), content_type='application/json')


if __name__ == "__main__":
    app.run(port=8080, host='0.0.0.0')
