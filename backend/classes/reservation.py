class Reservation:
    def __init__(self,id,facilityId,room,day,startTime,endTime,by):
        self.id = id
        self.facility = facilityId
        self.room = room
        self.day = int(day)
        self.startTime = startTime
        self.endTime = endTime
        self.by = by