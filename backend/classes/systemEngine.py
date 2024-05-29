import pandas as pd

from classes.buildingList import Building_list
from classes.building import Building
from classes.classObject import ClassObj
from classes.facility import Facility

# data input and initialization
def initialize():
    # data input for building and facility
    df_building = pd.read_excel("data_buildings.xlsx")
    df_building.dropna(axis=0, how='any', inplace=True)
    fac_df = pd.read_excel("data_facilities.xlsx")
    # record all buildings into a list
    building_list = []
    for row in df_building.itertuples():
        print(row.Index)
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
    # data input for class
    df_classes = pd.read_csv("data_classes.csv")
    # record all classes into a list
    classes = []
    for classItem in df_classes.itertuples():
        # create a class object based on the information and append to list
        classobj = ClassObj(classItem.Index,classItem.className,classItem.classroomId,classItem.day,classItem.startTime,classItem.endTime)
        classes.append(classobj)
    return Building_list(building_list), classes

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

