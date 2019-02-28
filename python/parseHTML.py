from html.parser import HTMLParser
from html.entities import name2codepoint
from urllib import request
import re

# handle_starttag(tag, attrs) ，处理开始标签，比如<div>；这里的attrs获取到的是属性列表，属性以元组的方式展示
# handle_endtag(tag) ，处理结束标签,比如</div>
# handle_startendtag(tag, attrs) ，处理自己结束的标签，如<img />
# handle_data(data) ，处理数据，标签之间的文本
# handle_comment(data) ，处理注释，<!-- -->之间的文本

class MyHtmlParser(HTMLParser):
    a_t1 = False
    a_t2 = False
    a_t3 = False
    def __init__(self):
        HTMLParser.__init__(self)
        self.information = []
        self.information_all = {}
    
    def handle_starttag(self, tag, attrs):
        def _attr(attrlist, attrname):
            for item in attrlist:
                if item[0] == attrname:
                    return item[1]
            return None
        
        if tag == 'time':
            self.a_t1 = True
        elif tag=="span" and _attr(attrs, 'class')=="event-location":
            self.a_t2 = True
        elif tag=="h3" and _attr(attrs, 'class')=="event-title":
            self.a_t3 = True
            
    def handle_data(self, data):
        if self.a_t1 == True:
            if re.match(r'^\s\d{4}', data):
                self.information.append(dict(year=data))
            else:
                self.information.append(dict(day=data))
        elif self.a_t2 == True:
            self.information.append(dict(event_location=data))
        elif self.a_t3 == True:
            self.information.append(dict(event_location=data))
    
    def handle_endtag(self, tag):
        if tag == 'time':
            self.a_t1 = False
        elif tag == 'span':
            self.a_t2 = False
        elif tag == 'h3':
            self.a_t3 = False

def parseHTML(reqUrl_str):
    parse = MyHtmlParser()
    parse.feed(reqUrl_str)
    for index,value in enumerate(parse.information):
         index +=1
         print('%s %s' %(index,value))
         if index%4==0:
             print('====================================')

URL = 'https://www.python.org/events/python-events/'
with request.urlopen(URL) as result:
    parseHTML(result.read().decode('utf-8'))