```java
package com.example.demo;

import java.util.LinkedList;

/**
 * @Auther: yliao
 * @Date: 2018/8/23
 * 等待超时模式
 */
public class ConnectionPool {
    private LinkedList<Integer> pool = new LinkedList<Integer>();

    public ConnectionPool(int initiaSize) {
        initiaSize = initiaSize <= 0 ? 10 : initiaSize;
        for (int i = 0; i < initiaSize; i++) {
            pool.add(i);
        }
    }

    public void releaseConnectionPool(Integer integer) {
        if (integer != null) {
            // 用容器做监视对象(锁)
            synchronized (pool) {
                pool.addLast(integer);
                // 唤醒在改监视器下的所有线程
                pool.notifyAll();
            }
        }
    }

    public Integer fatchConnection(long mills) throws InterruptedException {
        // 用容器做监视对象(锁)
        synchronized (pool) {
            /*
            如果传入的等待时间小于0,就代表一致阻塞,直到pool中有值的了,监视器对象(pool)调用了notifyAll方法才返回
             */
            if (mills < 0) {
                while (pool.isEmpty()) {
                    pool.wait();
                }
                return  pool.removeFirst();
            } else {
                long future = System.currentTimeMillis() + mills;
                long remaining = mills;
                while (pool.isEmpty() && remaining > 0) {
                    pool.wait(remaining);
                    // 不断更新等待时间
                    remaining = future - System.currentTimeMillis();
                }

                Integer integer = null;
                // 如果是超时退出上面的循环,那么就直接返回null, 反之则证明此时pool里面是有值
                if (!pool.isEmpty()) {
                    integer = pool.removeFirst();
                }
                return integer;
            }
        }
    }
}

```
