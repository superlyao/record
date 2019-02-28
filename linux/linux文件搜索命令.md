## locate命令和slocate命令都用来查找文件或目录

- 搜索etc目录下所有以sh开头的文件：

```sh
locate /etc/sh
```

- 搜索用户主目录下，所有以m开头的文件：

```
locate ~/m
```

- 搜索用户主目录下，所有以m开头的文件，并且忽略大小写：

```
locate -i ~/m
```

- 搜索没有所有者的文件

```
find /root -nouser
```

- 找到相关文件并删除

```
find /root -inum 262421 -exec rm -rm {} \; 
```