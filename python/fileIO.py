# encoding 指定编码类型 errors 错误处理方法
#  open('/Users/michael/gbk.txt', 'r', encoding='gbk', errors='ignore')
# 读文件
with open('/path/to/file', 'r') as f:
    print(f.read())

# 写文件
with open('/Users/michael/test.txt', 'w') as f:
    f.write('Hello, world!')