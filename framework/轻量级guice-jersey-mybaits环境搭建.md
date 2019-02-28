# guice+jersey+mybatis环境搭建

## jersey


- 核心服务器（Core Server）：通过提供JSR 311中标准化的注释和API标准化，可以用直观的方式开发RESTful Web服务。
- 核心客户端(Core Client)：Jersey客户端API能够帮助开发者与RESTful服务轻松通信；
- 集成（Integration)：Jersey还提供可以轻松继承Spring、Guice、Apache Abdera的库。

## guice

- 谷歌推出的一个轻量级依赖注入框架

## mybatis

- (MyBatis)[] 是一款优秀的持久层框架，它支持定制化 SQL、存储过程以及高级映射。
- MyBatis 避免了几乎所有的 JDBC 代码和手动设置参数以及获取结果集。
- MyBatis 可以使用简单的 XML 或注解来配置和映射原生信息，将接口和 Java 的 POJOs(Plain Old Java Objects,普通的 Java对象)映射成数据库中的记录。


## 引入jar包

```java
       <dependency>
            <groupId>org.glassfish.jersey</groupId>
            <artifactId>jersey-bom</artifactId>
            <version>2.6</version>
            <type>pom</type>
        </dependency>
        <dependency>
            <groupId>org.glassfish.jersey.ext</groupId>
            <artifactId>jersey-bean-validation</artifactId>
            <version>2.6</version>
        </dependency>
        <dependency>
            <groupId>org.glassfish.jersey.ext</groupId>
            <artifactId>jersey-mvc-jsp</artifactId>
            <version>2.6</version>
        </dependency>
        <dependency>
            <groupId>org.glassfish.jersey.media</groupId>
            <artifactId>jersey-media-multipart</artifactId>
            <version>2.6</version>
        </dependency>
        <dependency>
            <groupId>com.google.inject</groupId>
            <artifactId>guice</artifactId>
            <version>3.0</version>
        </dependency>
        <dependency>
            <groupId>com.google.inject.extensions</groupId>
            <artifactId>guice-servlet</artifactId>
            <version>3.0</version>
        </dependency>
        <dependency>
            <groupId>com.google.inject.extensions</groupId>
            <artifactId>guice-persist</artifactId>
            <version>3.0</version>
        </dependency>
        <dependency>
            <groupId>org.glassfish.hk2</groupId>
            <artifactId>guice-bridge</artifactId>
            <version>2.2.0</version>
            <exclusions>
                <exclusion>
                    <artifactId>javax.inject</artifactId>
                    <groupId>javax.inject</groupId>
                </exclusion>
            </exclusions>
        </dependency>
        <dependency>
            <groupId>com.google.inject.extensions</groupId>
            <artifactId>guice-multibindings</artifactId>
            <version>3.0</version>
        </dependency>
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
            <version>2.3.3</version>
        </dependency>
        <dependency>
            <groupId>com.fasterxml.jackson.jaxrs</groupId>
            <artifactId>jackson-jaxrs-json-provider</artifactId>
            <version>2.3.3</version>
        </dependency>
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis-guice</artifactId>
            <version>3.9</version>
        </dependency>
        <!-- https://mvnrepository.com/artifact/org.mybatis/mybatis -->
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
            <version>3.4.4</version>
        </dependency>
```

## guice集成mybatis

```java
/**
 * @author yliao
 * @Date 2018/4/27.
 */
public class DaoModule extends MyBatisModule {
    @Override
    protected void initialize() {
        //绑定guice-mybatis默认数据源provider 可以换成其他数据源
        bindDataSourceProviderType(PooledDataSourceProvider.class);
        //绑定TransactionFactory类型
        bindTransactionFactoryType(JdbcTransactionFactory.class);
        //绑定mybatis的mapper相关的类
        bindMybatisMapper();
        //绑定DB连接信息
        Names.bindProperties(binder(), getMybatisProperties());
    }

    /**
     * 绑定mybatis的mapper相关的类
     */
    private void bindMybatisMapper() {
        //将制定package下面的类都注册为mapper
        addMapperClasses("");
    }

    /**
     * 获取数据库连接信息
     *
     * @return
     */
    private Properties getMybatisProperties() {
        Properties myBatisProperties = new Properties();
        InputStream in = null;
        try {
          // 读取数据库相关配置
            in = DaoModule.class.getResourceAsStream("/mybatis.properties");
            myBatisProperties.load(in);
            in.close();
        } catch (IOException e) {
            Log.error(e.getMessage());
        }
        // myBatisProperties.setProperty("mybatis.environment.id", "e2e");
        myBatisProperties.setProperty("JDBC.autoCommit", "false");
        return myBatisProperties;
    }
}

```

## serviceModule配置

```java
public class ServiceModule extends AbstractModule {
    @Override
    protected void configure() {
      // 放入容器中 
      bind(IStatsService.class).to(StatsServiceImpl.class);
    }
}
```

## guice核心配置

```java
public class JerseyResourceConfig extends ResourceConfig {

    private static Injector injector;
    /**
     * 静态代码块 类加载时加载
     */
    static {
        System.out.println("init guice");
        List<Module> modules = new ArrayList<Module>();

        DaoModule daoModule = new DaoModule();
        ServiceModule serviceModule = new ServiceModule();

        modules.add(daoModule);
        modules.add(serviceModule);

        injector = Guice.createInjector(modules);
    }

    public static Injector getInjector() {
        return injector;
    }

    public JerseyResourceConfig() {
        initConfig(null);
    }

    @Inject
    public JerseyResourceConfig(ServiceLocator serviceLocator) {
        initConfig(serviceLocator);
    }

    protected void initConfig(ServiceLocator serviceLocator) {
      //web RESTful所在的包路径
        packages("");
        /**
        * 注册json解析组件
        * 这里可能会因为包的冲突造成restfull返回json报错
        */
        registerProviders();
        System.setProperty("file.encoding", "UTF-8");
        Field charset;
        try {
            charset = Charset.class.getDeclaredField("defaultCharset");
            charset.setAccessible(true);
            charset.set(null, null);
        } catch (Exception e) {
            Log.error(e.getMessage());
        }
        // 异常处理类
//        property("jersey.config.server.provider.packages",
//                "");
        property("jersey.config.server.provider.scanning.recursive", true);
        property(ServerProperties.BV_SEND_ERROR_IN_RESPONSE, true);
        register(RolesAllowedDynamicFeature.class);
        // 文件上传
        register(MultiPartFeature.class);
        //操作日志记录
        register(LoggingFilter.class);
        register(JspMvcFeature.class);
        property(JspMvcFeature.TEMPLATES_BASE_PATH, "/");
        // property("jersey.config.server.mvc.templateBasePath", "/");
        property(
                "com.sun.jersey.server.impl.container.ContainerRequestFilters",
                "com.sun.jersey.api.container.filter.LoggingFilter");
        property(
                "com.sun.jersey.server.impl.container.ContainerResponseFilters",
                "com.sun.jersey.api.container.filter.LoggingFilter");
        property("jersey.config.servlet.filter.staticContentRegex",
                "/(img|css|lib|appjs|res)/.*");
        property("jersey.config.servlet.filter.forwardOn404", true);

        if (serviceLocator != null) {
            createBiDirectionalGuiceBridge(serviceLocator);
        }
        Log.info("Registering injectables success....");
    }

    protected void registerProviders() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.setSerializationInclusion(JsonInclude.Include.ALWAYS);
        JacksonJaxbJsonProvider provider = new JacksonJaxbJsonProvider();
        provider.setMapper(mapper);
        register(provider);
    }

    public Injector createBiDirectionalGuiceBridge(ServiceLocator serviceLocator) {
        return createBiDirectionalGuiceBridge(serviceLocator,
                injector);
    }
    /**
     * 整合jersey与guice
     *
     * @param serviceLocator
     * @param injector
     * @return
     */
    public Injector createBiDirectionalGuiceBridge(
            ServiceLocator serviceLocator, Injector injector) {
        Module hk2Module = new HK2IntoGuiceBridge(serviceLocator);

        injector.createChildInjector(hk2Module);
        GuiceBridge.getGuiceBridge().initializeGuiceBridge(serviceLocator);
        GuiceIntoHK2Bridge g2h = serviceLocator
                .getService(GuiceIntoHK2Bridge.class);
        g2h.bridgeGuiceInjector(injector);
        Log.info("Registering createBiDirectionalGuiceBridge success....");
        return injector;
    }
}

```

## web.xml配置
```java
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xmlns="http://java.sun.com/xml/ns/javaee"
         xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd"
         version="2.5">
    <display-name>e2e</display-name>
    <filter>
        <filter-name>application</filter-name>
        <filter-class>org.glassfish.jersey.servlet.ServletContainer</filter-class>
        <!--初始化配置-->
        <init-param>
            <param-name>javax.ws.rs.Application</param-name>
            <!--JerseyResourceConfig 的路径-->
            <param-value></param-value>
        </init-param>
    </filter>
    <filter-mapping>
        <filter-name>application</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>

    <welcome-file-list>
        <welcome-file>report.html</welcome-file>
    </welcome-file-list>
</web-app>
```

## 一些小技巧

### @Transactional boolean rollbackOnly() default false;

```
If true, the transaction will never committed but rather rolled back, useful for testing purposes.

该属性值在测试的时候可以设置为true,可以避免测试数据库的脏数据
```
