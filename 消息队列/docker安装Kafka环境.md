## docker 安装kafka环境

首先确保下面各项的端口是开通了的,如: 2128（zookeeper） 9092 （kafka）

### docker安装zookeeper

```
 docker run -d --name zookeeper -p 2181:2181 -t wurstmeister/zookeeper
```

### docker安装kafka

```
docker run  -d --name kafka \
-p 9092:9092 \
-e KAFKA_BROKER_ID=0 \ 
-e KAFKA_ZOOKEEPER_CONNECT=192.168.204.128:2181 \ 
-e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://192.168.204.128:9092 \
-e KAFKA_LISTENERS=PLAINTEXT://0.0.0.0:9092 -t wurstmeister/kafka 
```
- `KAFKA_BROKER_ID` broker的id
- `KAFKA_ZOOKEEPER_CONNECT` zookeeper部署的地址
- `KAFKA_ADVERTISED_LISTENERS` 设置宿主机ip
- `KAFKA_LISTENERS` 设置宿主机ip

## centos7 安装kafka

### 安装zookeeper

- 下载 zookeeper 
- 配置 zookeeper环境

```
export ZOOKEEPER_HOME=/opt/zookeeper/zookeeper-3.4.13
export PATH=$ZOOKEEPER_HOME/bin:$PATH

```

- 启动命令 /opt/zookeeper/zookeeper-3.4.13/bin/zkServer.sh start

### 安装 kafka

- 下载 kafka 
- 默认配置启动kafka: bin/kafka-server-start.sh -daemon config/server.properties
- 创建topic： bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --                                   partitions 1 --topic MyTopic
```
--zookeeper localhost:2181 zookeeper 安装地址和端口
replication-factor 副本数
partitions 分区
MyTopic topic 名称

```