class ClassObj:

    def __init__(self, id, name, classroom_id, day, start_time, end_time):
        self.id = id
        self.name = name
        self.classroom_id = int(classroom_id)
        self.day = int(day)
        self.start_time = start_time
        self.end_time = end_time

    def match_id (self, id):
        return int(self.id) == int(id)

    def match_classroom_id (self, id):
        return int(self.classroom_id) == int(id)

    def to_briefs (self):
        return {
            'classId': self.id,
            'name': self.name,
            'classTime': self.start_time + '_' + self.end_time,
            'startTime': self.start_time,
            'day': self.day,
            'link': '/class/' + str(self.id)
        }

    def to_details (self, buildingList):
        building = buildingList.get_building_info_by_facility_id(self.classroom_id)
        days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
        return {
            'classId': self.id,
            'className': self.name,
            'classroomId': self.classroom_id,
            'classTime':  self.start_time + ' - ' + self.end_time + ', ' + days[self.day], 
            'buildingName': building['name'],
            'buildingId': building['id'],
            'classroom': building['classroom'],
            'classroomId': building['classroom_id']
        }