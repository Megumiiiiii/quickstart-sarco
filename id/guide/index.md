---
lastUpdated: true
---

<div align="center">

# Sarcophagus

</div>

---

![image](https://user-images.githubusercontent.com/98658943/214569281-4d9d3e0e-f1c5-4933-8559-07576ef885d7.png)

## Minimum Spek
> 10GB SSD
> 1GB RAM

## Domain
Garapan ini perlu domain pribadi seperti .com .net .id etc. Kalian bisa beli di Namecheap, Niagahoster, Contabo, atau manapun terserah.

### Setelah beli
- Masuk ke kelola domain (disni menggunakan niagahoster)
- Tambahkan DNS Record
- ![image](https://user-images.githubusercontent.com/98658943/214573355-e3f22b37-639c-4824-9024-11db2b05f96b.jpg)
  
- Pilih *A*
- ![image](https://user-images.githubusercontent.com/98658943/214574697-114cc2de-bb50-4ef0-885f-2bb0d6c37c8f.jpg)
  
- Masukan nama dan IP VPS
- ![image](https://user-images.githubusercontent.com/98658943/214574980-6d5b2864-a0e7-46c6-b6bf-66edf3e027bd.jpg)
  
- Simpan
  
## Install segala keperluan
```sh filename="update system" copy
sudo apt update; sudo apt upgrade
```
```sh filename="install docker dkk" copy
sudo apt-get update && sudo apt install jq git && sudo apt install apt-transport-https ca-certificates curl software-properties-common -y && curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add - && sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable" && sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

## Open port
```sh filename="port" copy
sudo ufw allow ssh; sudo ufw allow 443/tcp; sudo ufw allow 80/tcp; sudo ufw enable
```

## Clone Repo
```sh filename="clone" copy
git clone https://github.com/sarcophagus-org/quickstart-archaeologist
cd quickstart-archaeologist
```
	
## Mulai
### Membuat file `.env`
```sh filename="membuat .env" copy
cp .env.example .env
```

### Generate Mnemonic Pharse
```sh filename="generate pharse baru" copy
COMPOSE_PROFILES=seed docker compose run seed-gen
```
*BACKUP*

#### Atau lanjut menggunakan pharse dari testnet

### Membuat blank file peer ID

```sh filename="membuat peer-id" copy
touch peer-id.json
```

Jika masih ada peer-ID dari testnet, hapus dulu

```sh filename="menghapus peer-id lama" copy
rm peer-id.json
```


### Edit file .env
```sh filename="edit .env" copy
nano .env
```
Isi dengan data kalian
- ![image](https://user-images.githubusercontent.com/98658943/214577366-9b373fe5-d2c5-4d78-b86e-9038a2dea585.png)

Untuk mendapatkan Private Key, kalian bisa import Mnemonic nya ke Metamask, lalu lihat PrivKey dari sana. Dan untuk RPC Provider bisa dari Alchemy, silhakan buat APP Mainnet dan ambil RPC URL nya.
- ![image](https://github.com/Megumiiiiii/Sarcophagus/assets/98658943/0e9ac62c-9bf2-4b38-a3bb-5296085fa98c)


## Token Sacro
- Untuk mendapatkan Token bisa swap di Uniswap
- Pergi ke https://app.uniswap.org/
- Atau reward dari testnet, 1000 SARCO cukup
- SC Sarco: `0x7697B462A7c4Ff5F8b55BDBC2F4076c2aF9cF51A`

## Register
```sh filename="compose register" copy
COMPOSE_PROFILES=register docker compose run register
```
Y, Enter

### Lalu masukan nominal ( DiggingFee 100 - 500, CurseFee 300, dan FreeBond  1000 )
- ![image](https://github.com/Megumiiiiii/Sarcophagus/assets/98658943/cce8c4a4-3515-4861-8329-8ea0a451e699)



## Setelah selesai Register

#### Jalankan Node nya
```sh filename="compose up" copy
COMPOSE_PROFILES=service docker compose up -d
```

# SUDAH

## Command 

### Cek apakah node nya jalan pa ngga
```sh filename="cek daftar container" copy
docker container ls
```
Copy ID dari yang ada service2nya
- ![image](https://user-images.githubusercontent.com/98658943/214582956-e20e6a96-9bd0-4cfc-9244-9b6a038bf882.png)

Lalu
```sh filename="cek logs" copy
docker logs -f ContainerIDMu
```
Output yang benar
- ![image](https://user-images.githubusercontent.com/98658943/215103568-73db76de-ec4f-484e-9325-fc8a23ffb9d2.png)
	

### Jika ada update di waktu mendatang
```sh filename="step update" copy
cd ~/quickstart-archaeologist
COMPOSE_PROFILES=service docker compose stop
COMPOSE_PROFILES=service docker compose pull
COMPOSE_PROFILES=service docker compose up -d
```
### Restart Node (Jika ingin merestart)
```sh filename="restart" copy
COMPOSE_PROFILES=service docker compose stop
COMPOSE_PROFILES=service docker compose up -d
```

### Jika mengubah domain setelah Resgister

- Update Archaeologist dengan deposit 1 Sacro
```sh filename="menambah 1 freebond" copy
docker compose exec -it archaeologist sh
cli update -f 1
```
```sh filename="exit cli" copy
exit
```

- Lalu Restart
```sh filename="restart" copy
COMPOSE_PROFILES=service docker compose restart
```


## CLI ( Command Line Interface )
#### Update Digging Fee ke 300
```sh filename="update digging fee" copy
docker compose exec -it archaeologist sh
cli update -d 300
```
```sh filename="exit cli" copy
exit
```
300 bisa diubah berapapun

#### Menambah Free Bond 100
```sh filename="update freebond" copy
docker compose exec -it archaeologist sh
cli update -f 100
```
```sh filename="exit cli" copy
exit
```
- ![image](https://user-images.githubusercontent.com/98658943/214585483-bd61c8a2-a6bc-41b5-b24f-fe73dd4cf41b.png)
	
100 bisa diubah

#### Cek Profil
```sh filename="view profile" copy
docker compose exec -it archaeologist sh
cli view -p
```
```sh filename="exit cli" copy
exit
```

#### Klaim Rewards
```sh filename="claim reward" copy
docker compose exec -it archaeologist sh
cli claim
```
```sh filename="exit cli" copy
exit
```

#### Withdraw 10 dari Free Bond
```sh filename="withdraw freebond" copy
docker compose exec -it archaeologist sh
cli free-bond -w 10
```
```sh filename="exit cli" copy
exit
```
	
### Cek Domain
Masukan domain name kalian kesini https://www.nslookup.io/website-to-ip-lookup . Jika sudah sama dengan IP VPS berarti benar

## ⚠️ Jika ingin menghapus node ⚠️

```sh filename="DELETE" copy
cd ~/quickstart-archaeologist
COMPOSE_PROFILES=service docker compose down -v
docker rmi jwilder/nginx-proxy nginxproxy/acme-companion ghcr.io/sarcophagus-org/sarcophagus-v2-archaeologist-service
```

#