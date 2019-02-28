#!/usr/bin/env python3
# -*- coding: utf-8 -*-
L = [('Bob', 75), ('Adam', 92), ('Bart', 66), ('Lisa', 88)]
def by_name(item):
    return item[0]
def by_score(item):
    return item[1]

# 按名字排序
print(sorted(L, key = by_name))
# 按分数降序排序
print(sorted(L, key = by_score, reverse=True))

# 闭包
def createCounter():
    n = 0
    def counter():
        nonlocal n
        n = n+1
        return n
    return counter

f = createCounter()
print(f())

print(list(filter(lambda n : n % 2 == 1, range(1, 20))))