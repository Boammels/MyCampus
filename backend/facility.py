
import math


class Facility:
    def __init__(self, facility_id, english_name, building_name, position, description, opening_hours, image_link, link,
                 fac_type):
        self.facility_id = facility_id
        self.english_name = english_name
        self.building_name = building_name
        self.position = position
        self.description = description
        self.opening_hours = opening_hours
        self.image_link = image_link
        self.link = link
        self.fac_type = fac_type

    def match_type (self, fac_type):
        print("     type is \'"+self.fac_type + "\' while looking for \'" + fac_type + "\'")
        return self.fac_type == fac_type

    def to_class (self) :
        return self.fac_type, {
            'id': self.facility_id,
            'name': self.english_name,
            'fac_type': self.fac_type,
            'link': '/facility/' + str(self.facility_id),
        }

    def to_details (self, building_list) :
        id = building_list.get_building_id(self.building_name)
        return {
            'id': self.facility_id,
            'name': self.english_name,
            'building_name': self.building_name,
            'facType': self.fac_type,
            'position': self.position,
            'linke': self.link,
            'openingHours': self.opening_hours,
            'description': self.description,
            'imageLink': self.image_link,
            'buildingId': id
        }



