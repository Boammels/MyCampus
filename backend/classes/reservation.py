class Reservation:
    def __init__(self,id,facilityId,room,day,startTime,endTime,by):
        self.id = id
        self.facility = facilityId
        self.room = room
        self.day = int(day)
        self.startTime = startTime
        self.endTime = endTime
        self.by = by

    def to_object (self):
        days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
        return {
            'id': self.id,
            'facility': self.facility,
            'room': self.room,
            'day': days[self.day],
            'time': f"{self.startTime} - {self.endTime}"
        }