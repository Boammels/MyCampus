class Facility:
    def __init__(self, facility_id, english_name, building_id, position, description, opening_hours, image_link, link,
                 fac_type):
        self.facility_id = facility_id
        self.english_name = english_name
        self.building_id= building_id
        self.position = position
        self.description = description
        self.opening_hours = opening_hours
        self.image_link = image_link
        self.link = link
        self.fac_type = fac_type

    def match_type (self, fac_type):
        print("     type is \'"+self.fac_type + "\' while looking for \'" + fac_type + "\'")
        return self.fac_type == fac_type
    
    def match_id (self, id):
        return self.facility_id == int(id)

    def to_briefs (self) :
        return self.fac_type, {
            'id': self.facility_id,
            'name': self.english_name,
            'fac_type': self.fac_type,
            'link': '/facility/' + str(self.facility_id),
        }

    def to_details (self) :
        return {
            'id': self.facility_id,
            'name': self.english_name,
            'buildingId': int(self.building_id),
            'facType': self.fac_type,
            'position': self.position,
            'linke': self.link,
            'openingHours': self.opening_hours,
            'description': self.description,
            'imageLink': self.image_link,
        }



