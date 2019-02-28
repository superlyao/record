#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# 如果要让内部属性不被外部访问，
# 可以把属性的名称前加上两个下划线__，
# 在Python中，实例的变量名如果以__开头，
# 就变成了一个私有变量（private），只有内部可以访问，外部不能访问


# 在Python中，变量名类似__xxx__的，也就是以双下划线开头，
# 并且以双下划线结尾的，是特殊变量，特殊变量是可以直接访问的，不是private变量

class Student(object):
    # 第一个参数永远是self，表示创建的实例本身
    def __init__(self, name, score):
        self.name = name
        self.score = score

    def print_score(self):
        print('%s %s' % (self.name, self.score))

bart = Student('Bart Simpson', 59)
print(bart.name)
bart.print_score()

# ######################继承#########################

def Animal(object):
    def run(self):
        print('打印中')

# dog继承Animal
def dog(Animal):
    pass
# cat继承Animal
def cat(Animal):
    pass

# 定义一个特殊的__slots__变量，来限制该class实例能添加的属性,对继承的子类是不起作用的

class A():
    # 只允许添加 name和age这两个实例属性
    __slots__ = ('name', 'age')


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

