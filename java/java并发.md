- cpu多级缓存 缓存一致性(MESI)
- CountDownLatch
`等待所有线程执行完毕(只有等到countDownLatch的值减到0才会执行后面的语句)`
```java
   private final static Integer threadCount = 200;

    public static void main(String[] args) throws InterruptedException {
        ExecutorService exec = Executors.newCachedThreadPool();
        final CountDownLatch countDownLatch = new CountDownLatch(threadCount);

        for (int i = 0; i < threadCount; i++) {
            final int threadNum = i;
            exec.execute(() -> {
                try {
                    test(threadNum);
                } catch (Exception e) {
                    e.printStackTrace();
                }finally {
                    // 计数器减1
                    countDownLatch.countDown();
                }
            });
        }
        //等待所有线程执行完毕(只有等到countDownLatch的值减到0才会执行后面的语句)
        countDownLatch.await();
        System.out.println("执行完成");
        // 关闭线程池
        exec.shutdown();
    }

    public static void test(int i) throws InterruptedException {
        Thread.sleep(100);
        System.out.println("threadNum:" + i);
        Thread.sleep(100);
    }

```

- Semaphore信号量
`允许同时多少个线程访问`

```java
    private final static Integer threadCount = 200;

    public static void main(String[] args) throws InterruptedException {
        ExecutorService exec = Executors.newCachedThreadPool();
        // 只允许10个线程同时访问
        final Semaphore semaphore = new Semaphore(10);
        for (int i = 0; i < threadCount; i++) {
            final int threadNum = i;
            exec.execute(() -> {
                try {
                    // 获取一个许可
                    semaphore.acquire();
                    test(threadNum);
                    // 释放一个许可
                    semaphore.release();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            });
        }
        System.out.println("执行完成");
        // 关闭线程池
        exec.shutdown();
    }

    public static void test(int i) throws InterruptedException {
        System.out.println("threadNum:" + i);
        Thread.sleep(100);
    }
```

- CyclicBarrier
`执行一定数量的线程,执行成功过后再进行下一批执行`
```java
    private static CyclicBarrier cyclicBarrier = new CyclicBarrier(5);
    public static void main(String[] args) throws InterruptedException {
        ExecutorService exec = Executors.newCachedThreadPool();
        for (int i = 0; i < 10; i++) {
            final int threadNum = i;
            Thread.sleep(1000);
            exec.execute(() -> {
                try {
                    rece(threadNum);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            });
        }
        exec.shutdown();
    }

    private static void rece(int i) throws Exception {
        Thread.sleep(1000);
        System.out.println("输出：" + i);
        cyclicBarrier.await();
        System.out.println("该线程执行完毕：" + i);
    }
```