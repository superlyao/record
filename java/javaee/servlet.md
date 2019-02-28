### 必须集成的servlet类
- javax.servlet.GenericServlet
> 普通的servlet

-  javax.servlet.http.HttpServlet
> http servlet

### servlet的生命周期的方法
- init() 初始化方法
- service() 定义了能够处理的请求类型并且调用适当方法来处理这些请求
- destroy() 销毁方法

### 使用@webservice注解来开发servlet
- @webservice(name="servletName", urlPatterns="请求路径")
