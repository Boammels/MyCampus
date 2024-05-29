"""Flask server"""
import sys
from json import dumps
from flask_cors import CORS
from flask import Flask, request
from classes.systemEngine import *

APP = Flask(__name__)
CORS(APP)

building_list, class_list = initialize()

@APP.route('/echo/post/', methods = ['GET'])
def echo2():
    message = request.args.get('message')
    message = message.upper()
    return dumps({
        'echo' : message,
    })

@APP.route('/building/search/', methods = ['GET'])
def search_by_name ():
    name = request.args.get('buildingName')
    name = None if name == '' else name.lower()
    facility_type = request.args.get('facilityType')
    if facility_type == 'none':
        facility_type = None
    return dumps(query_buildings(building_list, name, facility_type))

@APP.route('/building/details/', methods = ['GET'])
def building_details ():
    building_id = request.args.get('buildingId')
    return dumps(query_building(building_list, building_id))

@APP.route('/facility/details/', methods = ['GET'])
def facility_details():
    facility_id = request.args.get('facilityId')
    print(facility_id)
    return dumps(query_facility(building_list, class_list, facility_id))

@APP.route('/class/details/', methods = ['GET'])
def class_details():
    class_id = request.args.get('classId')
    return dumps(query_class(building_list, class_list, class_id))

if __name__ == "__main__":
    port = sys.argv[1] if len(sys.argv) > 1 else 5000
    file1 = open("../config/api_address.json", "w")
    a = {
        "path": f"http://127.0.0.1:{port}"
    }
    file1.write(dumps(a))
    file1.close()
    APP.run(port=(port))
    