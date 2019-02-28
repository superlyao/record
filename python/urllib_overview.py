from urllib import request,parse
import json
# 普通访问
def getURL():
    with request.urlopen('https://api.douban.com/v2/book/2129650') as f:
        data = f.read()
        print('Status', f.status, f.reason)
        for k, v in f.getheaders():
            print('%s %s' %(k, v))
        print('Data', data.decode('utf-8'))



    # 伪造客户端信息
def addheader():
    req = request.Request('https://www.douban.com/')
    req.add_header('User-Agent', 'Mozilla/6.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/8.0 Mobile/10A5376e Safari/8536.25')
    with request.urlopen(req) as result:
        print('Status', result.status, result.reason)
        for k, v in result.getheaders():
            print('%s %s' % (k, v))
        print('Data', result.read().decode('utf-8'))


# post 请求
def reqPost():
    print('===================================>weibo login')
    email = input('Email:')
    password = input('password:')
    login_data = parse.urlencode([
        ('username', email),
        ('password', password),
        ('entry', 'mweibo'),
        ('client_id', ''),
        ('savestate', '1'),
        ('ec', ''),
        ('pagerefer', 'https://passport.weibo.cn/signin/welcome?entry=mweibo&r=http%3A%2F%2Fm.weibo.cn%2F')
    ])
    weiboReq = request.Request('https://passport.weibo.cn/sso/login')     
    req.add_header('Origin', 'https://passport.weibo.cn')
    req.add_header('User-Agent', 'Mozilla/6.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/8.0 Mobile/10A5376e Safari/8536.25')
    req.add_header('Referer', 'https://passport.weibo.cn/signin/login?entry=mweibo&res=wel&wm=3349&r=http%3A%2F%2Fm.weibo.cn%2F')

    with request.urlopen(req, data=login_data.encode('utf-8')) as weiboResult:
        print('Status:', weiboResult.status, weiboResult.reason)
        for k, v in weiboResult.getheaders():
            print('%s: %s' % (k, v))
        print('Data:', weiboResult.read().decode('utf-8'))

# 代理访问
def funcname():
    proxy_handler = urllib.request.ProxyHandler({'http': 'http://www.example.com:3128/'})
    proxy_auth_handler = urllib.request.ProxyBasicAuthHandler()
    proxy_auth_handler.add_password('realm', 'host', 'username', 'password')
    opener = urllib.request.build_opener(proxy_handler, proxy_auth_handler)
    with opener.open('http://www.example.com/login.html') as f:
        pass

def fetch_data(url):
    with request.urlopen(url) as result:
        return result.read().decode('utf-8')

URL = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20%3D%202151330&format=json'
data = json.loads(fetch_data(URL))
print(data['query'])