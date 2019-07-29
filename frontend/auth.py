
from datetime import datetime, timedelta
from flask import current_app, jsonify, request
from werkzeug.security import safe_str_cmp
import jwt

CONFIG_DEFAULTS = {
    'JWT_EXPIRATION_DELTA': timedelta(seconds=300),
    'JWT_NOT_BEFORE_DELTA': timedelta(seconds=0)
}


def init_app(app):
    for k, v in CONFIG_DEFAULTS.items():
        app.config.setdefault(k, v)
    app.config.setdefault('JWT_SECRET_KEY', app.config['SECRET_KEY'])
    auth_url_options = {'methods': ['POST']}
    auth_url_options.setdefault('view_func', _auth_request_handler)
    app.add_url_rule('/auth', **auth_url_options)


def _auth_request_handler():
    data = request.get_json()
    username = data.get('username', None)
    password = data.get('password', None)
    criterion = [username, password, len(data) == 2]

    if not all(criterion):
        raise AuthError('Bad Request', 'Invalid credentials')

    user = _authenticate(username, password)

    if user:
        access_token = _get_token_for(user)
        # return _jwt.auth_response_callback(access_token, identity)
        response = jsonify({'access_token': access_token.decode('utf-8')})
        response.set_cookie(key='token', value=access_token)
        return response
    else:
        raise AuthError('Bad Request', 'Invalid credentials')


class AuthError(Exception):
    def __init__(self, error, description, status_code=401, headers=None):
        self.error = error
        self.description = description
        self.status_code = status_code
        self.headers = headers

    def __repr__(self):
        return 'AuthError: %s' % self.error

    def __str__(self):
        return '%s. %s' % (self.error, self.description)


class User(object):
    def __init__(self, id, username, password, admin):
        self.id = id
        self.username = username
        self.password = password
        self.admin = admin

    def __str__(self):
        return 'User(id="%s")' % self.id


users = [
    User(1, 'a', 'b', False),
    User(2, 'abc', '123', True),
    User(3, 'daniel', 'password', True),
]

username_table = {u.username: u for u in users}
userid_table = {u.id: u for u in users}


def _authenticate(username, password):
    user = username_table.get(username, None)
    if user and safe_str_cmp(user.password.encode('utf-8'), password.encode('utf-8')):
        return user


def _get_token_for(user):
    if not user:
        return None
    iat = datetime.utcnow()
    exp = iat + current_app.config.get('JWT_EXPIRATION_DELTA')
    nbf = iat + current_app.config.get('JWT_NOT_BEFORE_DELTA')
    payload = {'exp': exp, 'iat': iat, 'nbf': nbf, 'id': user.id}
    secret = current_app.config.get('JWT_SECRET_KEY')
    return jwt.encode(payload, secret)


def _get_user_for_token(token=None):
    if not token:
        if not 'token' in request.cookies:
            return None
        token = request.cookies['token']
    secret = current_app.config.get('JWT_SECRET_KEY')
    payload = jwt.decode(token, secret)
    print(payload)
    user = userid_table.get(payload['id'])
    return user


def get_realm_for_token(token=None):
    user = _get_user_for_token(token)
    if not user:
        return 'login'
    if user.admin:
        return 'admin'
    else:
        return 'app'


def validate(realm, token=None):
    print('Validating', realm)
    if realm == 'login':
        return True
    if not realm in ('admin', 'app'):
        return False

    user = _get_user_for_token(token)
    if not user:
        return False
    if realm == 'app':
        return True
    if realm == 'admin' and user.admin:
        return True
    return False
