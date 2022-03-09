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
    # returns true if valid
    return bool(re.match('^[a-zA-Z0-9_.-]*$', app_id))


@app.route('/installed/apps', methods=['GET'])
def list_apps():
    # return the list of currently installed apps.
    return Response(json.dumps(get_installed_apps()), content_type='application/json')


@app.route('/installed/apps', methods=['POST'])
def change_apps():
    """
    failure modes:
    - the app list isn't a list
    - the app list has an entry that isn't an app id
    - the app list has an app id that can't be retrieved
    """

    desired_app_list = request.json
    desired_app_names = set(a['name'] for a in desired_app_list)
    desired_app_map = {a['name']: a for a in desired_app_list}
    current_app_list = get_installed_apps()
    current_app_names = set(a['name'] for a in current_app_list)

    deprecated_apps = current_app_names - desired_app_names
    new_apps = desired_app_names - current_app_names

    # add new apps
    for app_name in new_apps:
        if validate_app_id(app_name):
            with open(os.path.join(mitmapps_dir, desired_app_map[app_name]['name']), 'w+') as f:
                f.write(desired_app_map[app_name]['python'])

    # remove extra apps
    for app_id in deprecated_apps:
        os.remove(os.path.join(mitmapps_dir, app_id))

    return Response(json.dumps(get_installed_apps()), content_type='application/json')


if __name__ == "__main__":
    app.run(debug=True, port=8080, host='0.0.0.0')
