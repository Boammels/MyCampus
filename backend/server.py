"""Flask server"""
import sys
from json import dumps
from flask_cors import CORS
from flask import Flask, request
import graph as GR

APP = Flask(__name__)
CORS(APP)


@APP.route('/echo/post/', methods=['GET'])
def echo2():
    """ Description of function """
    return dumps({
        'echo' : 'Hwllo World',
    })

if __name__ == "__main__":
    APP.run(port=(sys.argv[1] if len(sys.argv) > 1 else 5000))