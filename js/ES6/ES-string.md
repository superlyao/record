#string

## charCodeAt(处理２个字节)
- 返回字符串的10进制码点

## codePointAt(处理４个字节)
- 返回字符串的10进制码点

## 为字符串新增遍历器接口
- `使用 for ... of 遍历`

```javascript
for (let codePoint of 'foo') {
  console.log(codePoint)
}
// "f"
// "o"
// "o"

```

## 方法

- indexOf (es5)

用来确定一个字符串是否包含另一个字符串,返回包含字符的下标,不包含返回-1

#### 以下三个方法接收第二个参数(int),表示从那个位置开始搜索

- includes(string, int)：返回布尔值，表示是否找到了参数字符串。

- startsWith(string, int)：返回布尔值，表示参数字符串是否在源字符串的头部。

- endsWith(string, int)：返回布尔值，表示参数字符串是否在源字符串的尾部。

- repeat(int): int 重复的次数

- padStart(int, string) int表示字符总长度　string填充的字符串
- padEnd(int, string) int 表示字符总长度 string填充的字符串

> 第二个参数可选　不选以空格填充　

```javascript
'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'

'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'

```
## 模板字符串
 - `` 用反引号表示,模板字符串中包含反引号,用\转义

 - `${function}`　可调用函数　未定义则报错

 - String.raw``
