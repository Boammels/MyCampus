class Student:
    def __init__ (self, id, name, student_id):
        self.id = id
        self.name = name
        self.student_id = int(student_id)
        self.list = {}

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

    def edit_watch (self, id, name):
        id = int(id)
        if id in self.list.keys():
            self.list[id]['watch'] = not self.list[id]['watch']
        else:
            self.list[id] = {'id': id, 'name': name, 'watch': True, 'share': False}

    def edit_share (self, id, name):
        id = int(id)
        if id in self.list.keys():
            self.list[id]['share'] = not self.list[id]['share']
        else:
            self.list[id] = {'id': id, 'name': name, 'share': True, 'watch': False}

    def get_share (self):
        res = []
        for student in self.list.values():
            if student['share']:
                res.append(student)
        return {'list': res}

    def get_watch (self):
        res = []
        for student in self.list.values():
            if student['watch']:
                res.append(student)
        return {'list': res}

    def check_share_watch(self, id):
        if int(id) in self.list.keys():
            return self.list[int(id)]
        else:
            return None
