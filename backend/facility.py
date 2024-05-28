
class Facility:
    def __init__(self, facility_id, english_name, building_name, position, description, opening_hours, chinese_name, abbreviation,
                 fac_type):
        self.facility_id = facility_id
        self.english_name = english_name
        self.building_name = building_name
        self.position = position
        self.description = description
        self.opening_hours = opening_hours
        self.chinese_name = chinese_name
        self.abbreviation = abbreviation
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



