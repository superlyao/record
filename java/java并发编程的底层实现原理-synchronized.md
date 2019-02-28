## synchronized
```
对于普通同步方法 锁是当前实例对象
对于静态同步方法 锁是当前类的Class对象
对于同步方法块 锁是synchronized括号里配置的对象
```

### 实现原理
1. JVM基于进入和退出monitor对象来实现方法同步和代码块同步
2. 代码块同步是使用monitorenter指令和monitorexit指令实现的（方法同步也可以使用）
