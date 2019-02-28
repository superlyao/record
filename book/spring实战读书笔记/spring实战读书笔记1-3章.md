## 第2章 bean的装配
- @Bean 会为spring注册一个上线的bean，方法体中包含最终产生bean实例的逻辑, 该bean的名字就是方法名
```java
@Bean
public CompactDisc setPeppers() {
  return new CompactDisc()
}
```

## 第3章
- NoUniqueBeanDefinitionException说明spring容器中存在多个类型相同的实例,创建的时候不知道指定那个实例，可以设定首选(primary),或者说使用限定符(qualifier)

```java
// 设定首选
@Component
@Priamry
public class ICeCream implements Dessert{}

//设定限定符
@Autowired
@Qualifier("iCeCream") //这里的ID是类名首字母小写
public void setDessert(Dessert dessert){}
```

- spEL #{}存放表达式 ${}存放占位符