`ctrl + l` 清屏

## 命令的基本格式

`命令 [选项] [参数]`
- 多个选项可以写在一起

### ls
`ls [选项] [文件或目录]`
- -a显示所有文件，包括隐藏文件
- -l显示详细信息
- -d查看目录属性
- -h人性化显示文件大小
- -i显示inode

### -rw-r--r--.

- `-`文件类型 (-文件 d目录 l软连接文件)
- rw- `u所有者`
- r-- `g所属组`
- r-- `o其他人`
- r读 w写 x执行

## 目录处理命令

### mkdir -p [目录名] 创建文件

- -p 递归创建

### touch 创建文件

```
-a：或--time=atime或--time=access或--time=use  只更改存取时间；
-c：或--no-create  不建立任何文件；
-d：<时间日期> 使用指定的日期时间，而非现在的时间；
-f：此参数将忽略不予处理，仅负责解决BSD版本touch指令的兼容性问题；
-m：或--time=mtime或--time=modify  只更该变动时间；
-r：<参考文件或目录>  把指定文件或目录的日期时间，统统设成和参考文件或目录的日期时间相同；
-t：<日期时间>  使用指定的日期时间，而非现在的时间；
--help：在线帮助；
--version：显示版本信息。
```

### rm -rf 删除目录

- r删除目录
- f强制删除

### cp 复制

- r 复制目录
- p 连带文件属性复制
- d 若源文件是连接文件 则复制连接属性
- a 相当于 -pdr 复制源文件的所有属性包括创建时间(`推荐`)

### mv 剪切 (目录改名)

- 如果源文件和目标文件在同一目录就是改名

### 链接文件
```
ln -s [源文件] [目标文件]
解释: 生成链接文件
-s 创建软连接
```

### 创建文件
vi filename

### 开启端口
- firewall-cmd --zone=public --add-port=3307/tcp --permanent
- firewall-cmd --reload
- firewall-cmd --list-ports

### 防火墙
- systemctl stop firewalld.service #停止firewall
- systemctl disable firewalld.service #禁止firewall开机启动
- systemctl start firewalld.service