## spring MVC处理请求的过程

![](./img/1.jpg)

### 第1步 dispatchServlet(前端控制器) 单列

- 所有请求都会经过前端控制器,前端控制器的任务就是将请求发送给控制器(controller)，但是要将请求发送给那个控制器，就需要通过处理器映射来处理

### 第2步 dispatchServlet->处理器映射

- 请求经过dispatchServlet之后，就到达处理器映射，在这里将决定将请求发送给那个controller

### 第3步和第4步 dispatchServletd->控制器

- 经过第2步以后，dispatchServlet已经知道将请求发送给那个controller了，就会将用户提交的信息交给控制器处理，信息处理完成过后，会生成一个modelandview对象,控制器做的最后一件事情就是讲模型数据打包，并且标示出用于 渲染输出的视图名，然后将`请求`连同模型和视图名发送给dispatchservlet

### 第5步 dispatchservlet -> 视图解析器

- dispatchservlet将会使用视图解析器来将逻辑视图名匹配一个特定的视图实现

### 第6步 dispatchservlet -> 视图
- dispatchservlet交付模型数据，视图渲染

### 第7步 响应

## dispatcherservlet配置

```java
public class SeckillWebInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {
    protected Class<?>[] getRootConfigClasses() {
        return new Class[]{RootConfig.class};
    }

    protected Class<?>[] getServletConfigClasses() {
        return new Class[]{WebConfig.class};
    }

    /*
    *将dispatcherservlet映射到"/"
    */
    protected String[] getServletMappings() {
        return new String[]{"/"};
    }
}
```

- `AbstractAnnotationConfigDispatcherServletInitializer`会创建`dispatchservlet`和`contextloaderlistener`

```java
@Configuration
// 启动MVC配置
@EnableWebMvc
// 扫描组件
@ComponentScan("com.yliao.seckill")
public class WebConfig extends WebMvcConfigurerAdapter {
    /**
     * jsp视图配置
     * @return
     */
    @Bean
    public ViewResolver viewResolver () {
        InternalResourceViewResolver resolver = new InternalResourceViewResolver();
        resolver.setPrefix("/WEB-INF/jsp/");
        resolver.setSuffix(".jsp");
        resolver.setExposeContextBeansAsAttributes(true);
        return resolver;
    }

    /**
     * 静态资源配置
     * 该配置会将静态资源的请求转发到servlet容器中默认的servlet上，不使DispatcherServlet
     * @param configurer
     */
    @Override
    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
        configurer.enable();
    }
}

```

## 处理表单

- 在处理post类型的请求时，在请求处理完成后，最好进行一下重定向，这样浏览器的刷新就不会重复提交表单

### 表单校验

- spring表单校验可以选择`org.hibernate.validator.HibernateValidator`

```xml
<mvc:annotation-driven validator="validator"></mvc:annotation-driven>
 
        <!-- 配置校验器 ,需要配置到处理器适配器中，因为使用的是注解驱动，可以在mvc:annotation-driven标签中设置validator属性为校验器的id-->
        <bean id="validator"
            class="org.springframework.validation.beanvalidation.LocalValidatorFactoryBean">
            <!-- 校验器，使用hibernate的校验框架 -->
            <property name="providerClass" value="org.hibernate.validator.HibernateValidator" />
            <!-- 指定校验使用的资源文件，如果不指定则默认使用classpath下的ValidationMessage.properties -->
            <property name="validationMessageSource" ref="messageSource" />
        </bean>
 
        <!-- 配置校验错误信息配置文件 -->
        <bean id="messageSource"
            class="org.springframework.context.support.ReloadableResourceBundleMessageSource">
            <!-- 资源文件名 -->
            <property name="basename">
                <list>
                <!--resouce路径下的CustomValidationMessages.properties-->
                    <value>classpath:CustomValidationMessages</value>
                </list>
            </property>
            <!-- 资源文件编码格式 -->
            <property name="fileEncodings" value="utf-8" />
            <!-- 资源文件缓存时间(120秒后重新加载) -->
            <property name="cacheSeconds" value="120" />
        </bean>

```

- 在controller中的相应形参中添加@Validated标注，在其后添加BindingResult bindingResult形参，用来接收校验出错信息，每一个添加了@Validated注解的形参后面都对应一个BindingResult bindingResult形参