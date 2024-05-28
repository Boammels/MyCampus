from typing import Optional
from facility import Facility


class Building:
    def __init__(self, building_id,  english_name, chinese_name, coordinate, position_description, abbreviation,
                 facility = None):
        """

        :rtype: object
        """
        self.building_id = building_id
        self.english_name = english_name
        self.chinese_name = chinese_name
        self.coordinate = coordinate
        self.position_description = position_description
        self.abbreviation = abbreviation
        self.facility = facility

