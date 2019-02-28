## 编译过程
*装换过程*
java语言规范->javac编译器->java虚拟机规范

## javac组件
- 词法分析器组件 -> Token流
- 语法分析器组件 -> 语法流
- 语义分析器组件 -> 注解语法树
- 代码生成器组件 -> 字节码

## 编译过程
将一个java源文件先解析成一个个的token流,在经过语法分析器将token流解析成更加结构化,可操作的一颗语法树

## classloader 双亲委派机制
```
通过调用loadClass方法逐级往上传递委派加载请求，当找不到父ClassLoader时调用其findClass方法尝试进行查找和加载，如果当前ClassLo找不所需的Class,则由其孩子尝试进行查找和加载，如果当前ClassLoader找了所需的Class则将该Class按请求路径逐级返回孩子
```

- bootstrap classloader
主要加载jvm自身工作的需要的类,仅仅是一个类的加载工具,没有父加载器也没有子加载器

- EXTClassLoader：扩展类加载器，ExtClassLoader会加载 $JAVA_HOME/jre/lib/ext下的类库（或者通过参数-Djava.ext.dirs指定）。

- AppClassLoader:应用程序加载器，会加载java环境变量CLASSPATH所指定的路径下的类库，而CLASSPATH所指定的路径可以通过Systemn.getProperty("java.class.path")获取，该变量可以覆盖。

## JVM内存结构
- `PC寄存器数据`(程序计数器)
1. 用于保存当前正常执行的程序的内存地址(记录当前线程执行到那条内存地址)
- `java栈`
1. 每当创建一个线程时，JVM会为这个线程创建一个对应的java栈
2. 栈中包含多个栈帧,每运行一个方法就创建一个栈帧
3. 栈顶保存当前正在执行的方法 pc寄存器执行的就是这个地址
4. 方法运行完成时清除栈帧
5. 每个栈帧保存一些内部变量，操作栈，方法返回信息
- `堆`
1. 存储java对象的地方
2. 堆内存所有java线程共享
- `方法区`
1. 存储类结构信息的地方
2. 常量池 域 方法数据 方法体 构造函数都存在这个区域
3. 被所有线程共享
- 本地方法区
1. JVM为运行native方法准备的空间
- 运行时常量池
1. 每个class文件中的常量表