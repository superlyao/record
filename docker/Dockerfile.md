FROM ubuntu - 基础镜像
MAINTAINER yliao - 作者
- 将/etc/apt/sources.list 文件中的'archive.ubuntu.com'换成'mirrors.ustc.edu.cn'
RUN sed -i 's/archive.ubuntu.com/mirrors.ustc.edu.cn/g' /etc/apt/sources.list 
RUN apt-get update
RUN apt-get install -y nginx
COPY index.html /var/www/html
ENTRYPOINT ["/usr/sbin/nginx","-g", "daemon off"]
EXPOSE 80