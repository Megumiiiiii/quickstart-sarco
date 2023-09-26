<div align="center">

# Sarcophagus

</div>

---

![image](https://user-images.githubusercontent.com/98658943/214569281-4d9d3e0e-f1c5-4933-8559-07576ef885d7.png)

## 最低スペック
> 10GB SSD
> 1GB RAM

## ドメイン
このプロジェクトには.com、.net、.idなどの個人用ドメインが必要です。Namecheap、Niagahoster、Contaboなど、どこで購入してもかまいません。

### 購入後
- ドメイン管理にアクセスします（ここではNiagahosterを使用しています）。
- DNSレコードを追加します。
- ![image](https://user-images.githubusercontent.com/98658943/214573355-e3f22b37-639c-4824-9024-11db2b05f96b.jpg)
  
- *A* を選択します。
- ![image](https://user-images.githubusercontent.com/98658943/214574697-114cc2de-bb50-4ef0-885f-2bb0d6c37c8f.jpg)
  
- ドメイン名とVPSのIPアドレスを入力します。
- ![image](https://user-images.githubusercontent.com/98658943/214574980-6d5b28-p-a0e7-46c6-b6bf-66edf3e027bd.jpg)
  
- 保存します
  
## すべての必要なものをインストール
```sh filename="update system" copy
sudo apt update; sudo apt upgrade
```
```sh filename="install docker dkk" copy
sudo apt-get update && sudo apt install jq git && sudo apt install apt-transport-https ca-certificates curl software-properties-common -y && curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add - && sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable" && sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

## ポートを開放
```sh filename="port" copy
sudo ufw allow ssh; sudo ufw allow 443/tcp; sudo ufw allow 80/tcp; sudo ufw enable
```

## リポジトリをクローン
```sh filename="clone" copy
git clone https://github.com/sarcophagus-org/quickstart-archaeologist
cd quickstart-archaeologist
```
	
## 開始
### `.env` ファイルを作成
```sh filename="membuat .env" copy
cp .env.example .env
```

### ニーモニックフレーズを生成
```sh filename="generate pharse baru" copy
COMPOSE_PROFILES=seed docker compose run seed-gen
```
*バックアップ*

#### またはテストネットのフレーズを使用する
### 空のピアIDファイルを作成
```sh filename="membuat peer-id" copy
touch peer-id.json
```

テストネットからピアIDがまだ存在する場合、まずそれを削除します
```sh filename="menghapus peer-id lama" copy
rm peer-id.json
```

### .env ファイルを編集
```sh filename="edit .env" copy
nano .env
```
データを入力します
- ![image](https://user-images.githubusercontent.com/98658943/214577366-9b373fe5-d2c5-4d78-b86e-9038a2dea585.png)

プライベートキーを取得するには、MnemonicをMetamaskにインポートし、そこからPrivKeyを確認できます。そして、RPCプロバイダーはAlchemyから取得できます。メインネットのRPC URLを作成してください。
- ![image](https://github.com/Megumiiiiii/Sarcophagus/assets/98658943/0e9ac62c-9bf2-4b38-a3bb-5296085fa98c)


## トークンSacro
- トークンを取得するにはUniswapでスワップできます
- https://app.uniswap.org/ に移動します
- またはテストネットからの報酬、1000 SARCOが十分です
- SC Sarco: `0x7697B462A7c4Ff5F8b55BDBC2F4076c2aF9cF51A`

## 登録
```sh filename="compose register" copy
COMPOSE_PROFILES=register docker compose run register
```
Y、Enter

### その後、ノミナル（DiggingFee 100 - 500、CurseFee 300、FreeBond 1000）を入力します。
- ![image](https://github.com/Megumiiiiii/Sarcophagus/assets/98658943/cce8c4a4-3515-4861-8329-8ea0a451e699)



## 登録が完了したら

#### ノードを実行する
```sh filename="compose up" copy
COMPOSE_PROFILES=service docker compose up -d
```

# 完了

## コマンド 

### ノードが実行中かどうかを確認する
```sh filename="cek daftar container" copy
docker container ls
```
サービスが存在するコンテナのIDをコピーします
- ![image](https://user-images.githubusercontent

.com/98658943/214582956-e20e6a96-9bd0-4cfc-9244-9b6a038bf882.png)

それから
```sh filename="cek logs" copy
docker logs -f ContainerIDMu
```
正しい出力
- ![image](https://user-images.githubusercontent.com/98658943/215103568-73db76de-ec4f-484e-9325-fc8a23ffb9d2.png)
	

### 将来の更新がある場合
```sh filename="step update" copy
cd ~/quickstart-archaeologist
COMPOSE_PROFILES=service docker compose stop
COMPOSE_PROFILES=service docker compose pull
COMPOSE_PROFILES=service docker compose up -d
```
### ノードを再起動する場合
```sh filename="restart" copy
COMPOSE_PROFILES=service docker compose stop
COMPOSE_PROFILES=service docker compose up -d
```

### 登録後、ドメインを変更する場合

- 1 SacroのデポジットでArchaeologistを更新します
```sh filename="menambah 1 freebond" copy
docker compose exec -it archaeologist sh
cli update -f 1
```
```sh filename="exit cli" copy
exit
```

- それから再起動
```sh filename="restart" copy
COMPOSE_PROFILES=service docker compose restart
```


## CLI（コマンドラインインターフェース）
#### Digging Feeを300に更新する
```sh filename="update digging fee" copy
docker compose exec -it archaeologist sh
cli update -d 300
```
```sh filename="exit cli" copy
exit
```
300は任意の値に変更できます

#### Free Bondを100追加する
```sh filename="update freebond" copy
docker compose exec -it archaeologist sh
cli update -f 100
```
```sh filename="exit cli" copy
exit
```
- ![image](https://user-images.githubusercontent.com/98658943/214585483-bd61c8a2-a6bc-41b5-b24f-fe73dd4cf41b.png)
	
100は変更できます

#### プロフィールを確認する
```sh filename="view profile" copy
docker compose exec -it archaeologist sh
cli view -p
```
```sh filename="exit cli" copy
exit
```

#### 報酬を受け取る
```sh filename="claim reward" copy
docker compose exec -it archaeologist sh
cli claim
```
```sh filename="exit cli" copy
exit
```

#### Free Bondから10を引き出す
```sh filename="withdraw freebond" copy
docker compose exec -it archaeologist sh
cli free-bond -w 10
```
```sh filename="exit cli" copy
exit
```
	
### ドメインを確認
あなたのドメイン名をここに入力してください：https://www.nslookup.io/website-to-ip-lookup。VPSのIPアドレスと同じであれば、正しいです

## ⚠️ ノードを削除する場合 ⚠️

```sh filename="DELETE" copy
cd ~/quickstart-archaeologist
COMPOSE_PROFILES=service docker compose down -v
docker rmi jwilder/nginx-proxy nginxproxy/acme-companion ghcr.io/sarcophagus-org/sarcophagus-v2-archaeologist-service
```

#