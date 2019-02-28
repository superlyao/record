class Student(object):
    
    @property
    def birth(self):
        return self._birth

    @birth.setter
    def birth(self, value):
        self._birth = value

    @property
    def age(self):
        return 2015 - self._birth

# @property是一个装饰器
brat = Student()
brat.birth = 29
print(brat.birth)

# age 就是只读属性
