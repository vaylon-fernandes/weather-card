from flask import Flask
import os

API_KEY = os.environ['API_KEY']


def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = os.environ['SECRET_KEY']
    from .views import views
    app.register_blueprint(views, url_prefix="/")

    return app
