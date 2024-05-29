class Building:
    def __init__(self, building_id,  english_name, chinese_name, coordinate, position_description, abbreviation, description,
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
        self.description = description

    def check_matching(self, name, fac_type, match_name, match_type):
        add = True # flag to determine if a building should be added 
        # check if it is a substring of the name or strictly matches the abbreviation
        if match_name and name not in self.english_name.lower() and name.upper() != self.abbreviation:
            add = False
        # check if the facility matches the type
        if match_type and not self.check_fac_type(fac_type):
            add = False
        return add

    # check if this building contains a certain type of facility
    def check_fac_type(self, fac_type):
        for facility in self.facilities:
            if facility.match_type(fac_type):
                return True
        return False
    
    def match_id (self, id):
        return self.building_id == id

    # transfer the building into a small dictionary containing few information
    def to_briefs (self):
        lat = self.coordinate.split(', ')[0]
        lon = self.coordinate.split(', ')[1]
        return {
            'id': self.building_id,
            'name': self.english_name,
            'lat': float(lat),
            'lng': float(lon)
        }

    # transfer the building into a big dictionary containing detailed information
    def to_details (self) :
        lat = self.coordinate.split(', ')[0]
        lon = self.coordinate.split(', ')[1]
        facilities = {
            'Classroom' : [],
            'Library': [],
            'Canteen': [],
            'Retail': [],
            'Printer': [],
            'Water Station': []
        }
        facility_list = []
        for facility in self.facilities:
            type_string, class_dict = facility.to_briefs()
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
            'facilities': facility_list,
            'description': self.description,
            'lat': float(lat),
            'lng': float(lon)
        }

