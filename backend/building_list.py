class Building_list:

    def __init__(self, building_list):
        self.building_list = building_list

    def get_building_id (self, string):
        for building in self.building_list:
            if building.english_name == string:
                return building.building_id

