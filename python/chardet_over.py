# 检测字符编码
import chardet
print(chardet.detect(b'hello word!'))

data = '中国'.encode('utf-8')
print(chardet.detect(data))