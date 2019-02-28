
java代码在编译后会变成java字节码，字节码被类加载器加载到JVM里，JVM执行字节码，最终转化为汇编指令在CPU上执行，java中所使用的并发机制依赖于JVMd的实现和CPU指令。

## volatile的应用

### 定义
volatile定义： java编程语言允许线程访问共享变量，为了确保共享变量能被准确和一直的新，线程应该确保通过 排他锁 单独获取这个变量

> volatile是轻量级的synchronized

1. 保证共享变量的‘可见性’

 当一个线程修改一个变量时，另外一个线程能读到这个修改的值

2. 相比`synchronized`来说使用执行成本更低，不会引起线程上下文切换和调度

### cpu级别的操作
> 如果一个变量被volatile修饰
1. 将当前处理器缓存行的数据写回到系统内存
2. `这个写回操作会使其他CPU里缓存了该内存地址的数据无效`

为保证各个处理器的缓存是一致的，就会实现缓存一致性 协议，每个处理器通过嗅探在总线上传播的数据来检查自己缓存的值是不是过期了，当处理器发现自己缓存行对应内存被修改了，就会将当前处理器的缓存行设置为无效状态，当处理器对这个数据进行修改操作时，会重新从系统内存中把数据读到处理器缓存中

### volatile写的内存语义(与锁的写的内存语义一致)

> 当写一个volatile变量是，jvm会把改线程对应的本地内存中额共享变量值刷新到主内存

### volatile读的内存语义(与锁的读的内存语义一致)

> 当读一个volatile变量的时候，jvm会把该线程对应的本地内存设置为无效，线程接下来将从主内存中读取共享变量

> storestore屏障可以保证在volatile写之前，其前面的所有普通写操作已经对任意处理器可见,因为storestore屏障将保障上面所有的普通写在volatile写之前刷新到主内存

### 双重检验锁定与延迟初始化

> 类初始化的伪代码
```java
memory = allocate()   //1. 分配对象的内存空间
ctorInstance(memory)  //2. 初始化对象
instance = memory     //3. 设置instance指向分配的内存地址
```

> 使用volatile关键字来初始化
```java
public class SafeDoubleCheckedLocking {
  /*
  *加上volatile关键字是为了初始化类的时候，防止在为类指向刚分配的内存地址时，发生重排序
  有可能导致分配内存地址这一步发生在初始化对象之前(此时对象已为不空)
  */
  public volatile static Instance instance;

  public static Instance getInstance {
    if (instance == null) {
      synchronized (SafeDoubleCheckedLocking.class) {
        if (instance ==null) {
          instance = new Instance();  
        }
      }
    }
    return instance;
  }
}
```

> 利用jvm类初始化机制
```java
/*
jvm执行初始化期间，jvm会获取一个锁，这个锁可以同步多个线程对同一个类的初始化
*/
public class InstanceFactory {
  public static class InstanceHolder {
    public static Instance instance = new Instance();
  }
  
  public static Instance getInstance() {
    return InstanceHolder.instance;
  }
}
```
