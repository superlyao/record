- `docker exec -it 91173f7a24d3 /bin/bash`
进入容器所在的系统，/bin/bash：系统中的命令

- `docker ps -a` 查看所有实例

- `docker images` 查看所有镜像

- `docker rm 91173f7a24d3` 删除实例

- `docker rm -f 91173f7a24d3 ` 若实例还在运行，则强制删除

- `docker rmi 81173f7a24d3` 删除镜像

- `docker stop 91173f7a24d3 ` 停止实例

- `docker start 91173f7a24d3 ` 启动动实例

- `docker run -it -d -v /opt:opt -p 80:80 jboss5.2 /opt/jboss-eap-5.2/bin/run.sh` 新建jboss5.2实例，并运行，参数说明：
-v:路径挂载
-d：后端执行
-ti：输出到标准终端
-p：端口映射
/opt/jboss-eap-5.2/bin/run.sh：执行镜像中的命令

# 将index.html复制到nginx容器之中
- docker cp index.html e99500f01e59://usr/share/nginx/html

# 将当前对容器的操作保存在容器之中,如果没有保存，容器 停止过后就没有作用(相当于创建镜像)
- docker commit -m 'fun' e99500f01e59 nginx-fun 

# 进入容器

- docker run -itd ubuntu:14.04 /bin/bash 
```
[root@localhost ~]# docker inspect --format "{{.State.Pid}}" 3e4c9cafc464
2780
[root@localhost ~]# nsenter --target "2780" --mount --uts --ipc --net --pid
```

# 拷贝一份容器中的配置文件出来 
docker cp master:/etc/mysql/my.cnf /usr/local/mysql/master/my.cnf

# 覆盖容器中的文件
docker cp /usr/local/mysql/master/my.cnf master:/etc/mysql/my.cnf

# mysql数据库的主从配置
```sql 
STOP SLAVE;

CHANGE MASTER TO 
MASTER_HOST='192.168.150.129',
MASTER_PORT=3306,
MASTER_USER='root',
MASTER_PASSWORD='root';

START SLAVE;
```

# 容器中安装vim
- 首先进入容器
- 设置软件源
```
    mv /etc/apt/sources.list /etc/apt/sources.list.bak
    echo "deb http://mirrors.163.com/debian/ jessie main non-free contrib" >/etc/apt/sources.list
    echo "deb http://mirrors.163.com/debian/ jessie-proposed-updates main non-free contrib" >>/etc/apt/sources.list
    echo "deb-src http://mirrors.163.com/debian/ jessie main non-free contrib" >>/etc/apt/sources.list
    echo "deb-src http://mirrors.163.com/debian/ jessie-proposed-updates main non-free contrib" >>/etc/apt/sources.list
    #更新安装源
    apt-get update 
```
- apt-get install -y vim

/root/mysql/mysql_master/data

docker run --name mysql-master \
-p 3306:3306 \
-v /zc/mysql-master/datadir:/var/lib/mysql \
-e MYSQL_ROOT_PASSWORD='123456' -d zhangchao/mysql-master5.7:v1