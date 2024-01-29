import requests as requests
from flask import jsonify, render_template, Blueprint
from . import API_KEY

views = Blueprint('views', __name__)

#  TODO: comment test
def required_data(data_from_source):
    icon = str(data_from_source['weather'][0]['icon'])
    temp = str(data_from_source['main']['temp'])
    pressure = str(data_from_source['main']['pressure'])
    humidity = str(data_from_source['main']['humidity'])
    wind_speed = str(data_from_source['wind']['speed'])
    city_name = str(data_from_source["name"])

    data = {
        "icon": icon,
        "temp": temp,
        "pressure": pressure,
        "wind_speed": wind_speed,
        "humidity": humidity,
        "city_name": city_name
    }
    return jsonify(data)


@views.route('/', methods=['GET', 'POST'])
def home():
    return render_template('index.html')


@views.route('/get_weather/<lat>,<lon>', methods=['GET'])
def get_weather(lat, lon):
    url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=metric&appid={API_KEY}"
    get_data = requests.get(url).json()
    data = required_data(get_data)
    return data
