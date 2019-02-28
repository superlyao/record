## docer部署kafka
- docker pull wurstmeister/zookeeper  
- docker pull wurstmeister/kafka  
- docker run -d --name zookeeper -p 2181:2181 -t wurstmeister/zookeeper  
- docker run --name kafka -p 9092:9092 -e KAFKA_ZOOKEEPER_CONNECT="192.168.150.129:2181" -e KAFKA_ADVERTISED_HOST_NAME="192.168.150.129" -e LANG="en_US.UTF-8" -v /docker/kafka/kfk_log:/kafka -v /var/run/docker.sock:/var/run/docker.sock -tid wurstmeister/kafka

## 创建主题
- bin/kafka-topics.sh --create --zookeeper zookeeper:2181 --replication-factor 1 --partitions 1 --topic mykafka  
