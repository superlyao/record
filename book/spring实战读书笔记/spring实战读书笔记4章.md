## spring对AOP的支持
- 基于代理的经典spring AOP
- 纯POJO切面
- @AspectJ注解驱动切面
- 注入式AspectJ切面(适用用于Spring各版本)
- springAOP构建在动态代理上，所有支持方法拦截

## 编写切点
```java
// 只匹配concert包
execution (** concret.Perfromance.perform(..)) and within(concert.*)
```

```java
// 只匹配beanID为woodstock执行
excution (** concret.Perfromance.perform(..)) and bean('woodstock')
```

## 定义切面
- @Before 方法执行前
- @After 方法执行后
- @AfterReturning 方法执行成功后
- @AfterThrowing 方法执行失败后
- @Around 将目标方法封装起来 定义环绕通知
- @Pointcut 定义重复使用的的切点

```java
@Pointcut("excution (** concret.Perfromance.perform(..)) ")
private void performance(){}
```

### 使用方法的参数

```java
// 使用通知方法类型为int 参数名为arg的参数
@Pointcut(excution (** concret.Perfromance.perform(int)) and args(arg))
public void track(int arg){}

@Before("track(arg)")
public void countTrack(int arg){}
```