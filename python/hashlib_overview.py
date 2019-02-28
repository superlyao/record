import hashlib
from contextlib import closing
from urllib.request import urlopen

md5 = hashlib.md5()
md5.update('how to use md5 in python hashlib?'.encode('utf-8'))
print(md5.hexdigest())


with closing(urlopen('https://www.python.org')) as page:
    for line in page:
        print(line)