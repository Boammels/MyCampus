from typing import Optional
from building_list import Building_list


def query_buildings(building_list: Building_list, name: Optional[str] = None, fac_type: Optional[str] = None):
    result_list = []
    if name is None and fac_type is None:
        return building_list

    # name query
    if name is not None and fac_type is None:
        for building in building_list.building_list:
            if name in building.english_name:
                result_list.append(building)
        return result_list

    # type query
    if name is None and fac_type is not None:
        for building in building_list.building_list:
            for fac in building.facility:
                if fac.fac_type == fac_type:
                    result_list.append(building)
                    break
        return result_list

    # name && type query
    for building in building_list.building_list:
        if name in building.english_name:
            for fac in building.facility:
                if fac.fac_type == fac_type:
                    result_list.append(building)
                    break
    return result_list


def query_building(building_list: Building_list, building_id):
    for building in building_list.building_list:
        if building.building_id == building_id:
            return building


def query_facility(building_list: Building_list, facility_id):
    for building in building_list.building_list:
        for facility in building.facility:
            if facility.facility_id == facility_id:
                return facility
