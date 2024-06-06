class Student:
    def __init__ (self, id, name, student_id):
        self.id = id
        self.name = name
        self.student_id = student_id

    def get_student_timetable(self, events, classes, reservations):
        days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
        timetable = []
        for day in days:
            timetable.append({
                'name': day,
                'entities': []
            })
        for event in events:
            if event.participant == self.student_id:
                print(event.outer_id)
                print(len(classes))
                if event.type == 'class':
                    classObj = classes[event.outer_id]
                    timetable[classObj.day]['entities'].append({
                        'name': classObj.name,
                        'type': 'class',
                        'id': event.outer_id
                    })
                else:
                    reservation = reservations[event.outer_id]
                    timetable[reservation.day]['entities'].append({
                        'name': 'library booking',
                        'type': 'reservation',
                        'id': event.outer_id
                    })
        return timetable

