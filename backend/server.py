"""Flask server"""
import sys
from json import dumps
from flask_cors import CORS
from flask import Flask, request
from echo import echo_upper
import graph as GR
import initialize from initialize

APP = Flask(__name__)
CORS(APP)

building_list = initialize()


@APP.route('/echo/post/', methods=['GET'])
def echo2():
    message = request.args.get('message')
    message = echo(message)
    return dumps({
        'echo' : message,
    })

if __name__ == "__main__":
    APP.run(port=(sys.argv[1] if len(sys.argv) > 1 else 5000))