import unittest

class Student(object):
    @property
    def score(self):
        return self.score
    
    @score.setter
    def score(self, value):
        if value < 0 or value > 100:
            raise ValueError('成绩输入不规范')

    def __init__(self, name, score):
        self.name = name
        self.score = score

    def get_grade(self):
        if self.score >=60 and self.score < 80:
            return 'B'
        if self.score >=80 and self.score <=100:
            return 'A'
        if self.score >= 0 and self.score < 60:
            return 'C'

list = [36, 5, -12, 9, -21]
for index, item in enumerate(list):
    print('下标 %d : %s' % (index, item))
