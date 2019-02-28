# Python中获取系统信息的另一个好办法是使用psutil这个第三方模块
import psutil
# CPU逻辑数量
print(psutil.cpu_count())

# CPU物理核心
print(psutil.cpu_count(logical=False))

