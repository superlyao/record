## 配置相关

- server.prot 配置启动端口
- server.context-path 项目启动根路径
- spring.profiles.active 指定文件(如生产环境`application-dev.yml`还是开发环境`application-prod.yml`)

## 全局属性

- 在application中配置。用@value("${}")来调用

## 包相关

- spring-boot-starter-thymeleaf 就可以配置相关页面 默认路径为templates/*.html
- Application.java不能直接放在/java目录下，要放在/java/二级目录下