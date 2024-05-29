class Building_list:

    def __init__(self, building_list):
        self.building_list = building_list

    def get_building_id (self, name):
        for building in self.building_list:
            if building.english_name == name:
                return building.building_id
            
    def get_building_info_by_facility_id(self, classroom_id):
        for building in self.building_list:
            for facility in building.facilities:
                if facility.facility_id == int(classroom_id):
                    res = building.to_briefs()
                    res['classroom_id'] = classroom_id
                    res['classroom'] = facility.english_name
                    return res