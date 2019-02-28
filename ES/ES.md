# 安装
## 单实例安装
- 9200 ES节点和外部通讯使用
- 9300 ES节点之间通讯使用
### 在 config/elasticsearch.yml 最后增加
- http.cors.enabled: true
- http.cors.allow-origin: "*"

## 集群安装

### master
- http.cors.enabled: true
- http.cors.allow-origin: "*"

- cluster.name: yliao
- node.name: master
- node.master: true

- network.host: 127.0.0.1

### slave
- cluster.name: yliao
- node.name: slave1

- network.host: 127.0.0.1
- http.port: 9201


- discovery.zen.ping.unicast.hosts: ["127.0.0.1"] # mater的地址

# 概念

## 基础概念

- 索引 含有相同属性的文档集合 (`数据库`) 必须小写
- 类型 索引可以定义一个或个类型，文档必须属于一个类型 (`表`)
- 文档 是可以被索引的基本数据单位 (`记录`)

- 分片 每个索引都用多个分片 每个分片是一个Lucene索引
- 备份 拷贝一份分片就完成了分片的备份

# 操作

## 创建索引 PUT

http://localhost:9200/book

例子如下:

```json
{
	"settings": {
		"number_of_shards": 3, // 分片数
		"number_of_replicas": 1 // 副本数
	},
	"mappings": {
		"man": {
			"properties": {
				"name": {
					"type": "text"
				},
				"country": {
					"type": "keyword"
				},
				"age": {
					"type": "integer"
				},
				"date": {
					"type": "date",
					"format": "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis"
				}
			}
		},
		"woman": {
			
		}
	}
}
```

## 插入

### 指定文档ID插入

在类型后面指定id

- http://localhost:9200/people/man/1

```json
{
	"name": "yliao1",
	"country": "china",
	"age": 40,
	"date": "2000-10-10"
}
```
### 自动产生文档ID插入

不指定ID就自动插入

- http://localhost:9200/people/man/

## 修改

### 直接修改文档

http://localhost:9200/people/man/1/_update

```json
{
	"doc": {
		"age": 50
	}
}
```

### 脚本修改文档

http://localhost:9200/people/man/1/_update

```json
{
	"script": {
		"lang": "painless",
		"inline": "ctx._source.age = params.age",
		"params": {
			"age": 100
		}
	}
}
```

## 删除

### 删除文档 delete

http://localhost:9200/people/man/1

### 删除索引 delete

http://localhost:9200/people

## 查询

### 简单查询

- `get` http://localhost:9200/book/novel/1
- `post` http://localhost:9200/book/_search
// 查询全部
```json
{
  "query": {
    "match_all": {

    }
  },
  "from": 1, //从哪里返回
  "size": 1 // 返回几条
}
```

// 条件查询
```json
{
  "query": {
    "match": {
        "title": "" //这里写关键字
    }
  },
  "sort": [
    {
      "publish_date": {"order": "desc"} //排序字段:排序类型
    }
  ]
}
```

### 聚合查询

- `post` http://localhost:9200/book/_search

```json
{
  "aggs": {
    "group_by_word_count": {
      "terms": {
        "field": "word_count"
      }
    }
  }
}
```

## 项目依赖包
```xml
        <dependency>
            <groupId>org.elasticsearch.client</groupId>
            <artifactId>transport</artifactId>
						<!--5.5.2-->
            <version>${elasticsearch.version}</version>
        </dependency>
```

## docker 安装 ES的命令
```
docker run -d  --name es1 -p 9200:9200 -p 9300:9300 -v /opt/es/config/es1.yml:/usr/share/elasticsearch/config/elasticsearch.yml -v /opt/es/config/data:/usr/share/elasticsearch/data elasticsearch:5.6.4
```