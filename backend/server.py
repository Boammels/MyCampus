"""Flask server"""
import sys
from json import dumps
from flask_cors import CORS
from flask import Flask, request
from classes.systemEngine import *

APP = Flask(__name__)
CORS(APP)

building_list, class_list, student_list, event_list, reservation_list = initialize()

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
    return dumps(query_facility(building_list, class_list, facility_id))

@APP.route('/class/details/', methods = ['GET'])
def class_details():
    class_id = request.args.get('classId')
    return dumps(query_class(building_list, class_list, class_id))

@APP.route('/timetable/', methods = ['GET'])
def timetable():
    token = request.args.get('token')
    student_id = request.args.get('studentId')
    return dumps(get_timetable(int(token), int(student_id), student_list, event_list, class_list, reservation_list))

@APP.route('/login/', methods = ['POST'])
def login():
    student_id = request.json['studentId']
    res, name = check_user(student_id, student_list)
    return dumps({
        "result": res,
        "studentId": student_id,
        "name": name
    })

@APP.route('/crowdness/', methods = ['GET'])
def crowdness():
    return dumps({
        'crowdness': random.randint(0,10)
    })

@APP.route('/reservation/details/', methods = ['GET'])
def reservation_details():
    reservation_id = request.args.get('reservationId')
    return dumps(query_reservation(building_list, reservation_list, reservation_id))

@APP.route('/edit/watch/', methods = ['POST'])
def edit_watch():
    student_id = request.json['studentId']
    friend_id = request.json['friendId']
    change_watch(int(student_id), int(friend_id), student_list)
    return dumps({
        "result": 'success'
    })

@APP.route('/edit/share/', methods = ['POST'])
def edit_share():
    student_id = request.json['studentId']
    friend_id = request.json['friendId']
    change_share(int(student_id), int(friend_id), student_list)
    return dumps({
        "result": 'success'
    })

@APP.route('/search/student/', methods = ['GET'])
def search_student():
    token = request.args.get('token')
    search_content = request.args.get('searchContent')
    print(search_content)
    return dumps(query_student(token, student_list, search_content))

@APP.route('/friends/Watch/', methods = ['GET'])
def get_watch_list():
    token = request.args.get('token')
    return dumps(query_student_list(token, student_list, 'watch'))

@APP.route('/friends/Share/', methods = ['GET'])
def get_share_list():
    token = request.args.get('token')
    return dumps(query_student_list(token, student_list, 'share'))



if __name__ == "__main__":
    port = sys.argv[1] if len(sys.argv) > 1 else 5000
    file1 = open("../config/api_address.json", "w")
    a = {
        "path": f"http://127.0.0.1:{port}"
    }
    file1.write(dumps(a))
    file1.close()
    APP.run(port=(port))
    