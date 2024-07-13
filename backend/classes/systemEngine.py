import random
import pandas as pd

from classes.buildingList import Building_list
from classes.building import Building
from classes.classObject import ClassObj
from classes.facility import Facility
from classes.student import Student
from classes.event import Event
from classes.reservation import Reservation

# data input for building and facility
def input_buildings ():
    df_building = pd.read_excel("data_buildings.xlsx")
    df_building.dropna(axis=0, how='any', inplace=True)
    fac_df = pd.read_excel("data_facilities.xlsx")
    # record all buildings into a list
    building_list = []
    for row in df_building.itertuples():
        #print(row.Index)
        facilities = []
        # recording all facilities belongs to the building into a list
        for fac_row in fac_df[fac_df['BuildingId'] == row.Index].itertuples():
            # create a facility object based on the information and append to list
            facility = Facility(fac_row.Index, fac_row.EnglishName, fac_row.BuildingId, fac_row.Position,
                                fac_row.Description,
                                fac_row.OpeningHours, fac_row.image_link, fac_row.Link, fac_row.Type)
            facilities.append(facility)
        # create a building object based on the information and append to list
        building = Building(row.Index, row.EnglishName, row.ChineseName, row.Coordinate, row.PositionDescription,
                            row.Abbreviation, row.Description, facilities)
        building_list.append(building)
    return Building_list(building_list)

def input_classes ():
    # data input for class
    df_classes = pd.read_csv("data_classes.csv")
    # record all classes into a list
    classes = []
    for classItem in df_classes.itertuples():
        # create a class object based on the information and append to list
        classobj = ClassObj(classItem.Index,classItem.className,classItem.classroomId,classItem.day,classItem.startTime,classItem.endTime)
        classes.append(classobj)
    return classes
    
def input_students ():
    df_students = pd.read_csv("data_students.csv")
    # record all classes into a list
    students = []
    for studentItem in df_students.itertuples():
        # create a class object based on the information and append to list
        student = Student(studentItem.Index, studentItem.name, studentItem.studentId)
        students.append(student)
    return students

def input_events ():
    df_events = pd.read_csv("data_events.csv")
    # record all classes into a list
    events = []
    for eventItem in df_events.itertuples():
        # create a class object based on the information and append to list
        event = Event(eventItem.Index, eventItem.type, eventItem.outerId, eventItem.participant)
        events.append(event)
    return events

def input_reservations ():
    df_reservations = pd.read_csv("data_reservations.csv")
    # record all classes into a list
    reservations = []
    for reservationItem in df_reservations.itertuples():
        # create a class object based on the information and append to list
        reservation = Reservation(reservationItem.Index, reservationItem.facilityId, reservationItem.room, reservationItem.day, reservationItem.startTime,reservationItem.endTime,reservationItem.by)
        reservations.append(reservation)
    return reservations

# data input and initialization
def initialize():
    buildings = input_buildings()
    classes = input_classes()
    students = input_students()
    events = input_events()
    reservations = input_reservations()
    return buildings, classes, students, events, reservations

# query buildings based on their name (abbreviation) or facilities
def query_buildings(building_list, name, fac_type):
    match_name = (name != None) # if name is none, skip checking name
    match_type = (fac_type != None) # if fac_type is none, skip checking facilities
    # put all matching results into a list
    result_list = []
    for building in building_list.building_list:
        # if the building matches, add the building to the list
        if building.check_matching(name, fac_type, match_name, match_type):
            result_list.append(building.to_briefs())
    return result_list

# get the building of the matched id
def query_building(building_list: Building_list, building_id):
    for building in building_list.building_list:
        if building.match_id(int(building_id)):
            return building.to_details()
    return None

# get the facility of the matched id
def query_facility(building_list: Building_list, class_list, facility_id):
    # visit each building for its facilities
    for building in building_list.building_list:
        for facility in building.facilities:
            # if the facility id matches, get its details
            if facility.match_id(int(facility_id)):
                res = facility.to_details()
                # if it is a Classroom, get all its classes
                if res['facType'] == 'Classroom':
                    res['classes'], res['count'] = query_classes_of_classroom(class_list, facility_id)
                if res['facType'] == 'Canteen':
                    res['crowdness'] = random.randint(0,10)
                return res
    return None

# get all classes that is held in a classroom
def query_classes_of_classroom(class_list, classroom_id):
    count = 0
    # create a index to record classes for each day
    classes = []
    for day in ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']:
        classes.append({'name': day, 'entities': []})
    # visit all classes and check if the classroom matches
    for classobj in class_list:
        if classobj.match_classroom_id(int(classroom_id)):
            # if match, get the brief details and put into the correct day
            classinfo = classobj.to_briefs()
            classes[classinfo['day']]['entities'].append(classinfo)
            count += 1
    return classes, count

# get the class of the matched id
def query_class(building_list, class_list, class_id):
    # visit all classes and check if the id matches
    for classobj in class_list:
        if classobj.match_id(int(class_id)):
            return classobj.to_details(building_list)
    return None

def get_timetable(token, student_id, students, events, classes, reservations):
    for student in students:
        if student.student_id == student_id:
            access = False
            if token != student_id:
                for item in student.list.values():
                    if token == item['id'] and item['share']:
                        access=True
            if access == False:
                print(1)
                return {
                    'name' : student.name,
                    'timetable': False
                }
            print(2)
            student_information = {
                'name' : student.name,
                'timetable': student.get_student_timetable(events, classes, reservations)
            }
            return student_information

def check_user(student_id, students):
    for student in students:
        if str(student.student_id) == str(student_id):
            return True, student.name
    return False, " "

def query_reservation(building_list, reservation_list, reservation_id):
    res = None
    for reservation in reservation_list:
        if int(reservation.id) == int(reservation_id):
            res =  reservation.to_object()
    if res != None:
        for building in building_list.building_list:
            for facility in building.facilities:
                if int(facility.facility_id) == int(reservation.facility):
                    res['building'] = building.english_name
                    res['buildingId'] = building.building_id
                    res['facility_name'] = facility.english_name
    return res

def change_watch(self_id, friend_id, students):
    name = ''
    this = None
    for student in students:
        if self_id == student.student_id:
            this = student
        elif friend_id == student.student_id:
            name = student.name
    if this != None and name != '':
        this.edit_watch(friend_id, name)

def change_share(self_id, friend_id, students):
    name = ''
    this = None
    for student in students:
        if self_id == student.student_id:
            this = student
        elif friend_id == student.student_id:
            name = student.name
    if this != None and name != '':
        this.edit_share(friend_id, name)

def query_student (token, students, search_content):
    this = None
    for student in students:
        if student.student_id == int(token):
            this = student
    if this != None:
        print('found')
    res = []
    for student in students:
        record = False
        if search_content in student.name:
            record = True
        elif search_content.isnumeric():
            if student.student_id == int(search_content):
                record = True
        if record:
            student_res = {}
            student_res['name'] = student.name
            student_res['id'] = student.student_id
            if student.student_id == int(token):
                continue
            share_watch = this.check_share_watch(student.student_id)
            if share_watch == None:
                student_res['share'] = False
                student_res['watch'] = False
            else:
                student_res['share'] = share_watch['share']
                student_res['watch'] = share_watch['watch']
            res.append(student_res)
    return {'res': res}
    
def query_student_list(token, students, type):
    this = None
    for student in students:
        if student.student_id == int(token):
            this = student
    if type == 'watch':
        return this.get_watch()
    else:
        return this.get_share()
