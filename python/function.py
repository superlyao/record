import math # 引入math模块

# def 用来定义函数 可返回多个值(就是返回一个tuple)
def my_abs(param):
    if not isinstance (param, (int, float)):
        return TypeError('类型错误')
    if param > 0:
        return param
    else:
        return -param

# pass 占位符
def bop():
    pass

# 默认参数
def pow(param, x=2):
    s = 1
    while x > 0:
        x = x-1
        s = s * param
    return s

# 可变参数 在参数前面加一个*
def calc(*numbers):
    sum = 0
    for n in numbers:
        sum = sum + n * n
    return sum

# 关键字参数 **
# 可变参数允许你传入0个或任意个参数，
# 这些可变参数在函数调用时自动组装为一个tuple(元祖)。
# 而关键字参数允许你传入0个或任意个含参数名的参数，
# 这些关键字参数在函数内部自动组装为一个dict(字典)

def person(name, age, **kw):
    print('name:', name, 'age:', age, 'other:', kw)

extra = {'city': 'Beijing', 'job': 'Engineer'}
person('jack', 25, **extra)

# 命名关键字参数 
# 命名关键字参数需要一个特殊分隔符*，*后面的参数被视为命名关键字参数
# 
def person1(name, age, *, city, job):
    print(name, age, city, job)

# city job必须命名 且必须输入
person1('Jack', 24, city='Beijing', job='Engineer')

# 参数组合
# 在Python中定义函数，可以用必选参数、默认参数、可变参数、关键字参数和命名关键字参数，
# 这5种参数都可以组合使用。但是请注意，参数定义的顺序必须是：必选参数、默认参数、可变参数、命名关键字参数和关键字参数。

def product(*param):
    sum = 1
    for item in param:
        sum = sum * item
    return sum
print(product(5,6,7))