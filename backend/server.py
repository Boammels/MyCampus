"""Flask server"""
import sys
from json import dumps
from flask_cors import CORS
from flask import Flask, request
from initialize import initialize
from query_service import *

APP = Flask(__name__)
CORS(APP)

building_list = initialize()


#@APP.route('/echo/post/', methods = ['GET'])
#def echo2():
#    message = request.args.get('message')
#    message = echo_upper(message)
#    return dumps({
#        'echo' : message,
#    })

@APP.route('/building/searchName/', methods = ['GET'])
def search_by_name ():
    name = request.args.get('name')
    return dumps(query_buildings(building_list, name = name))

@APP.route('/building/searchFacility/', methods = ['GET'])
def search_by_facility ():
    facility_type = request.args.get('facilityType')
    return dumps(query_buildings(building_list, fac_type = facility_type))

@APP.route('/building/details/', methods = ['GET'])
def building_details ():
    building_id = request.args.get('buildingId')
    return dumps(query_building(building_list, building_id))

@APP.route('/facility/details/', methods = ['GET'])
def facility_details():
    facility_id = request.args.get('facilityId')
    return dumps(query_facility(building_list, facility_id))

if __name__ == "__main__":
    port = sys.argv[1] if len(sys.argv) > 1 else 5000
    file1 = open("../config/api_address.json", "w")
    a = {
        "path": f"http://127.0.0.1:{port}"
    }
    file1.write(dumps(a))
    file1.close()
    APP.run(port=(port))
    