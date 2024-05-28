from typing import Optional
from building_list import Building_list


def query_buildings(building_list, name, fac_type):
    match_name = (name != None)
    match_type = (fac_type != None)

    result_list = []
    for building in building_list.building_list:
        print("checking " + building.english_name)
        add = True
        if match_name and name not in building.english_name.lower():
            add = False
        if match_type and not building.check_fac_type(fac_type):
            add = False
        if add:
            result_list.append(building.to_brief_class())
            print("added " + building.english_name)
    return result_list


def query_building(building_list: Building_list, building_id):
    for building in building_list.building_list:
        if building.building_id == int(building_id):
            print(1)
            return building.to_class()


def query_facility(building_list: Building_list, facility_id):
    for building in building_list.building_list:
        for facility in building.facilities:
            if facility.facility_id == int(facility_id):
                _, result = facility.to_class()
                print(result)
                return result
