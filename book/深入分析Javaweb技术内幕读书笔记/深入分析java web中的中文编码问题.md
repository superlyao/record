- utf-16是用的定长2字节来编码，对于单字节的来说比较浪费空间
- utf-8对于单字节范围内的字符仍然使用1个字节表示,对汉字采用3个字节,相比较于GBK和GBK2312来说不用查码表,效率更高

# java web 中涉及的编解码

## http header编解码

- header解码是在调用request.getHeader时进行
- 默认是ISO-8859-1且不能设置其他解码格式
- 不能再header中设置非ASCII字符(也就不能有中文),如果非要有中文可以用`org.apache.catalina.util.URLEncoding`编码,在放到header中

## post 表单的编解码

- 使用request.getParameter获取参数之前,必须设置request.setCharacterEncoding(charset)编码

# js 中的编码问题

- 外部引入的js可以通过script的charset属性设置编码
- escape()方法可以将特殊字符进行Unicode编码 unescape()可以解码
- escapsURI()可以对URI进行编码,解码通过decodeURI()方法git