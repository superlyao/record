a = 100
if a>100:
    print('100')
elif a<100:
    print('小于100')
else:
    print('等于100')

# 列表
list = [
    ['Apple', 'Google', 'Microsoft'],
    ['Java', 'Python', 'Ruby', 'PHP'],
    ['Adam', 'Bart', 'Lisa']
]
print(list[0][0])
print(list[1][1])
print(list[-1][-1])

# 元祖 指向不可变
tuple = (1,2)
print(tuple)

for item in list:
    print(item)

for item in tuple:
    print(item)
    
# 字典的key必须是不可变对象
dict = {'Michael': 95, 'Bob': 75, 'Tracy': 85}
# 获取不存在的key 返回None
print(dict.get('a'))
# 删除一个key 返回value
print(dict.pop('Michael'))

# 两个set可以做数学意义上的交集、并集
s1 = set([1,2,3])
s2 = set([2,3,6])

print(s1 & s2)
print(s1 | s2)