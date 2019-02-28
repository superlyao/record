## 第一章 深入web请求过程
- 需要用InetAddress解析域名，必须使用单列模式
- Windows刷新DNS缓存 : ipconfig /flushdns
- Linux刷新DNS缓存: /etc/init.d/nscd restart

## 第二章 深入分析java io工作机制 

- 操作系统为保护系统的安全，将内核程序运行的内存空间和用户程序运行的内存空间进行隔离
- 数据从磁盘空间复制到内核空间，然后又从内核空间复制到用户空间

### 访问文件的方式

- 标准访问文件(运用到缓存)
- 直接IO方式(直接操作磁盘)
- 同步访问文件(阻塞)
- 异步访问文件(非阻塞)
- 内存映射

### java访问磁盘文件

- FileDescriptor.sync()可以将系统缓存中的数据强制刷新到物理硬盘中

## NIO学习

### Buffer
- `capacity` 当前缓冲区的大小
- `position` 下一个操作的数据元素的位置(可是读的位置,也可以是写的位置)
- `limit` 缓冲区数组中不可操作的下一个元素的位置 `limit<=capacity`
- `mark` 用于记录当前position的前一个位置或者默认是0
### Channel
- DatagramChannel
- SocketChannel
- FileChannel
- ServerSocketChannel
### Selector
```
这是一个可以用于监视多个通道的对象，如数据到达，连接打开等。因此，单线程可以监视多个通道中的数据。
```
![表1](/img/nio-1.png)

```java
public void sekector() throws IOException {
        // 初始化一个在载具,并初始化大小
        ByteBuffer buffer = ByteBuffer.allocate(1024);
        // 初始化一个选择器
        Selector selector = Selector.open();
        // 初始化一个服务端管道
        ServerSocketChannel serverSocketChannel = ServerSocketChannel.open();
        // 设置为非阻塞方式
        serverSocketChannel.configureBlocking(false);
        serverSocketChannel.socket().bind(new InetSocketAddress(8080));
        // 注册监听的事件
        serverSocketChannel.register(selector, SelectionKey.OP_ACCEPT);
        while (true) {
            // 取得所有key的集合
            Set<SelectionKey> selectionKeys =  selector.selectedKeys();
            Iterator<SelectionKey> iterator = selectionKeys.iterator();
            while (iterator.hasNext()) {
                SelectionKey key = iterator.next();
                if ((key.readyOps() & SelectionKey.OP_ACCEPT) == SelectionKey.OP_ACCEPT) {
                    ServerSocketChannel channel = (ServerSocketChannel)key.channel();
                    // 接受到服务端的请求
                    SocketChannel accept = channel.accept();
                    accept.configureBlocking(false);
                    accept.register(selector, SelectionKey.OP_READ);
                    iterator.remove();
                } else if ((key.readyOps() & SelectionKey.OP_READ) == SelectionKey.OP_READ) {
                    SocketChannel channel = (SocketChannel)key.channel();
                    while (true) {
                        buffer.clear();
                        // 读取数据
                        int n = channel.read(buffer);
                        if (n < 0) {
                            break;
                        }
                        buffer.flip();
                    }
                    iterator.remove();
                }
            }
        }
    }
```

### 适配器模式和装饰器模式的区别
- 装饰器模式和适配器模式都有一个别名就是包装模式
- 适配器模式的意义是要将一个借口转变成另外一个借口,通过改变原来接口来达到重复使用的目的
- 装饰器模式是要改变被装饰对象的接口，保留原来的接口，增强了原来对象的功能，或则改变原有对象的处理方法
而提升性能