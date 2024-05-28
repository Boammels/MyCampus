class Building:
    def __init__(self, building_id,  english_name, chinese_name, coordinate, position_description, abbreviation,
                 facilities = []):
        """
        :rtype: object
        """
        self.building_id = building_id
        self.english_name = english_name
        self.chinese_name = chinese_name
        self.coordinate = coordinate
        self.position_description = position_description
        self.abbreviation = abbreviation
        self.facilities = facilities

    def check_fac_type(self, fac_type):
        for facility in self.facilities:
            if facility.match_type(fac_type):
                return True
        return False

    def to_brief_class (self):
        lat = self.coordinate.split(', ')[0]
        lon = self.coordinate.split(', ')[1]
        return {
            'id': self.building_id,
            'name': self.english_name,
            'lat': float(lat),
            'lng': float(lon),
        }

    def to_class (self) :
        facilities = {
            'Classroom' : [],
            'Library': [],
            'Canteen': [],
            'Retail': [],
            'Water Station': []
        }
        facility_list = []
        for facility in self.facilities:
            type_string, class_dict = facility.to_class()
            facilities[type_string].append(class_dict)
        for fac_type in facilities.keys():
            new_dict = {}
            new_dict['name'] = fac_type
            new_dict['entities'] = facilities[fac_type]
            facility_list.append(new_dict)
        return {
            'id': self.building_id,
            'name': self.english_name,
            'abbreviation': self.abbreviation,
            'facilities': facility_list
        }

