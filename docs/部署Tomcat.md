# 部署 Tomcat 容器

## 准备数据

```bash
# 从镜像服务器拉取 Tomcat 镜像
docker pull tomcat:10.1-jdk17

# 创建临时的 Tomcat 容器
docker run -d -p 38080:8080 --name temp_tomcat tomcat:10.1-jdk17

# 进入容器
docker exec -it temp_tomcat /bin/bash

# 删除 webapps，用 webapps.dist 替换 webapps
rm -rf webapps
mv webapps.dist webapps

# 退出到宿主机
exit

# 进入工作目录
mkdir -p /root/docker/tomcat/data
cd /root/docker/tomcat

# 拷贝文件
docker cp temp_tomcat:/usr/local/tomcat/conf/ ./data/conf
docker cp temp_tomcat:/usr/local/tomcat/logs/ ./data/logs
docker cp temp_tomcat:/usr/local/tomcat/webapps/ ./data/webapps

# 删除临时容器
docker rm -f temp_tomcat
```

## 编写 DockerCompose 配置文件

书写 docker-compose.yaml 文件（/root/docker/tomcat/docker-compose.yaml）

```yaml
version: "3.8"

services:
  tomcat:
    image: tomcat:10.1-jdk17
    container_name: tomcat
    restart: unless-stopped
    ports:
      - "38080:8080"
    environment:
      TZ: Asia/Shanghai
    volumes:
      - ./data/conf:/usr/local/tomcat/conf
      - ./data/logs:/usr/local/tomcat/logs
      - ./data/webapps:/usr/local/tomcat/webapps
```

## 运行容器

```bash
cd /root/docker/tomcat
docker compose up -d
```

## 项目部署

将项目的 dist 文件夹内容上传到 /root/docker/tomcat/data/webapps/ROOT 目录下，Tomcat 会自动部署该应用。