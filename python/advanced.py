# 切片就是分隔
L = ['Michael', 'Sarah', 'Tracy', 'Bob', 'Jack']
print(L[:3]) # 前3个元素
print(L[1:3]) # ['Sarah', 'Tracy']
print(L[-2:]) # 取最后两个
print(L[::2]) # 

# tuple(元祖)也可以进行切片
t = (0, 1, 2, 3, 4, 5)[:3] #  (0, 1, 2)

# 字符串切片
'ABCDEFG'[:3] # ABC

# 迭代
dict = {'a': 1, 'b': 2, 'c': 3}
# 循环key
for key  in dict:
    print(key)

for value in dict.values():
    print(value)

# 列表生成式
print([x * x for x in range(1,11) if x % 2 == 0])

# ['AX', 'AY', 'AZ', 'BX', 'BY', 'BZ', 'CX', 'CY', 'CZ']
[m + n for m in 'ABC' for n in 'XYZ']

# 循环字典
d = {'x': 'A', 'y': 'B', 'z': 'C' }
for k,v in d.items():
    print(k,'=', v)

L = ['Hello', 'World', 18, 'Apple', None]
print([i.lower() for i in L if isinstance(i, str)])

# generator 生成器

g = (x * x for x in range(10))
for n in g:
    print(n)

def triangles(n):
        L = [1]
        while (len(L) - 1) < n:
            yield L
            L = [1] + [L[x - 1] + L[x] for x in range(len(L)) if (x > 0 and n > 1)] + [1]


def normalize(name):
    return name[:1].upper()+name[1:].lower()

print(list(map(normalize, ['adam', 'LISA', 'barT'])))
