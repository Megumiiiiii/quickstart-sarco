---
lastUpdated: false
---

<div align="center">

# Sarcophagus

</div>

---

![image](https://user-images.githubusercontent.com/98658943/214569281-4d9d3e0e-f1c5-4933-8559-07576ef885d7.png)

## 最低配置
> 10GB SSD
> 1GB 内存

## 域名
此项目需要私人域名，如 .com、.net、.id 等。您可以在 Namecheap、Niagahoster、Contabo 或任何其他地方购买域名。

### 购买后
- 进入域名管理（这里使用 Niagahoster）
- 添加 DNS 记录
- ![image](https://user-images.githubusercontent.com/98658943/214573355-e3f22b37-639c-4824-9024-11db2b05f96b.jpg)
  
- 选择 *A*
- ![image](https://user-images.githubusercontent.com/98658943/214574697-114cc2de-bb50-4ef0-885f-2bb0d6c37c8f.jpg)
  
- 输入名称和 VPS IP
- ![image](https://user-images.githubusercontent.com/98658943/214574980-6d5b2864-a0e7-46c6-b6bf-66edf3e027bd.jpg)
  
- 保存
  
## 安装所需软件
```sh filename="更新系统" copy
sudo apt update; sudo apt upgrade
```
```sh filename="安装 Docker 等" copy
sudo apt-get update && sudo apt install jq git && sudo apt install apt-transport-https ca-certificates curl software-properties-common -y && curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add - && sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable" && sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

## 开放端口
```sh filename="端口" copy
sudo ufw allow ssh; sudo ufw allow 443/tcp; sudo ufw allow 80/tcp; sudo ufw enable
```

## 克隆存储库
```sh filename="克隆" copy
git clone https://github.com/sarcophagus-org/quickstart-archaeologist
cd quickstart-archaeologist
```
	
## 开始
### 创建 `.env` 文件
```sh filename="创建 .env" copy
cp .env.example .env
```

### 生成助记词
```sh filename="生成新助记词" copy
COMPOSE_PROFILES=seed docker compose run seed-gen
```
*备份*

#### 或者继续使用测试网的助记词

### 创建空白的 Peer ID 文件

```sh filename="创建 Peer ID" copy
touch peer-id.json
```

如果仍然存在来自测试网的 Peer ID，请首先删除它

```sh filename="删除旧的 Peer ID" copy
rm peer-id.json
```


### 编辑 .env 文件
```sh filename="编辑 .env" copy
nano .env
```
填写您的数据
- ![image](https://user-images.githubusercontent.com/98658943/214577366-9b373fe5-d2c5-4d78-b86e-9038a2dea585.png)

要获取私钥，您可以将助记词导入到 Metamask 中，然后从那里查看私钥。至于 RPC 提供程序，您可以使用 Alchemy，创建 Mainnet 应用程序并从那里获取 RPC URL。
- ![image](https://github.com/Megumiiiiii/Sarcophagus/assets/98658943/0e9ac62c-9bf2-4b38-a3bb-5296085fa98c)


## Sacro 代币
- 要获取代币，您可以在 Uniswap 上交换
- 转到 https://app.uniswap.org/
- 或从测试网获取奖励，只需 1000 SARCO
- SC Sarco：`0x7697B462A7c4Ff5F8b55BDBC2F4076c2aF9cF51A`

## 注册
```sh filename="创建注册" copy
COMPOSE_PROFILES=register docker compose run register
```
Y，回车

### 然后输入金额（DiggingFee 100 - 500、CurseFee 300 和 FreeBond 1000）
- ![image](https://github.com/Megumiiiiii/Sarcophagus/assets/98658943/cce8c4a4-3515-4861-8329-8ea0a451e699)



## 注册完成后

#### 运行节点
```sh filename="创建节点" copy
COMPOSE_PROFILES=service docker compose up -d
```

# 完成

## 命令

### 检查节点是否运行
```sh filename="检查容器列表" copy
docker container ls
```
复制具有服务的容器的 ID
- ![image](https://user-images.githubusercontent.com/98658943/214582956-e20e6a96-9bd0-4cfc-9244-9b6a038bf882.png)

然后
```sh filename="检查日志" copy
docker logs -f ContainerIDMu
```
正确的输出
- ![image](https://user-images.githubusercontent.com/98658943/215103568-73db76de-ec4f-484e-9325-fc8a23ffb9d2.png)
	

### 如果将来有更新
```sh filename="更新步骤" copy
cd ~/quickstart-archaeologist
COMPOSE_PROFILES=service docker compose stop


COMPOSE_PROFILES=service docker compose pull
COMPOSE_PROFILES=service docker compose up -d
```
### 重新启动节点（如果需要重新启动）
```sh filename="重新启动" copy
COMPOSE_PROFILES=service docker compose stop
COMPOSE_PROFILES=service docker compose up -d
```

### 如果在注册后更改域名

- 使用 1 Sacro 更新 Archaeologist
```sh filename="添加 1 FreeBond" copy
docker compose exec -it archaeologist sh
cli update -f 1
```
```sh filename="退出 cli" copy
exit
```

- 然后重新启动
```sh filename="重新启动" copy
COMPOSE_PROFILES=service docker compose restart
```


## CLI（命令行界面）
#### 将 Digging Fee 更新为 300
```sh filename="更新 Digging Fee" copy
docker compose exec -it archaeologist sh
cli update -d 300
```
```sh filename="退出 cli" copy
exit
```
您可以将其更改为任何其他数字

#### 添加 100 Free Bond
```sh filename="更新 FreeBond" copy
docker compose exec -it archaeologist sh
cli update -f 100
```
```sh filename="退出 cli" copy
exit
```
- ![image](https://user-images.githubusercontent.com/98658943/214585483-bd61c8a2-a6bc-41b5-b24f-fe73dd4cf41b.png)
	
您可以更改金额

#### 查看配置文件
```sh filename="查看配置文件" copy
docker compose exec -it archaeologist sh
cli view -p
```
```sh filename="退出 cli" copy
exit
```

#### 领取奖励
```sh filename="领取奖励" copy
docker compose exec-it archaeologist sh
cli claim
```
```sh filename="退出 cli" copy
exit
```

#### 从 Free Bond 中提取 10
```sh filename="提取 FreeBond" copy
docker compose exec -it archaeologist sh
cli free-bond -w 10
```
```sh filename="退出 cli" copy
exit
```
	
### 检查域名
在此处输入您的域名 https://www.nslookup.io/website-to-ip-lookup 。如果 IP 地址与 VPS 的 IP 地址相同，则正确

## ⚠️ 如果要删除节点 ⚠️

```sh filename="删除" copy
cd ~/quickstart-archaeologist
COMPOSE_PROFILES=service docker compose down -v
docker rmi jwilder/nginx-proxy nginxproxy/acme-companion ghcr.io/sarcophagus-org/sarcophagus-v2-archaeologist-service
```

#