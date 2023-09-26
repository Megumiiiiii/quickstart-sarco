<div align="center">

# Sarcophagus

</div>

---

![image](https://user-images.githubusercontent.com/98658943/214569281-4d9d3e0e-f1c5-4933-8559-07576ef885d7.png)

## Минимальные требования
> 10 ГБ SSD
> 1 ГБ оперативной памяти (RAM)

## Домен
Для этого проекта необходимо иметь собственный домен, такой как .com, .net, .id и так далее. Вы можете приобрести его на Namecheap, Niagahoster, Contabo или где угодно.

### После покупки
- Войдите в управление доменом (здесь используется Niagahoster).
- Добавьте DNS-запись
- ![image](https://user-images.githubusercontent.com/98658943/214573355-e3f22b37-639c-4824-9024-11db2b05f96b.jpg)
  
- Выберите *A*
- ![image](https://user-images.githubusercontent.com/98658943/214574697-114cc2de-bb50-4ef0-885f-2bb0d6c37c8f.jpg)
  
- Укажите имя и IP VPS
- ![image](https://user-images.githubusercontent.com/98658943/214574980-6d5b2864-a0e7-46c6-b6bf-66edf3e027bd.jpg)
  
- Сохраните
  
## Установите необходимое программное обеспечение
```sh filename="обновить систему" copy
sudo apt update; sudo apt upgrade
```
```sh filename="установить Docker и другое" copy
sudo apt-get update && sudo apt install jq git && sudo apt install apt-transport-https ca-certificates curl software-properties-common -y && curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add - && sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable" && sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

## Откройте порты
```sh filename="порт" copy
sudo ufw allow ssh; sudo ufw allow 443/tcp; sudo ufw allow 80/tcp; sudo ufw enable
```

## Клонируйте репозиторий
```sh filename="клонировать" copy
git clone https://github.com/sarcophagus-org/quickstart-archaeologist
cd quickstart-archaeologist
```
	
## Начните
### Создайте файл `.env`
```sh filename="создать .env" copy
cp .env.example .env
```

### Создайте мнемоническую фразу
```sh filename="создать новую фразу" copy
COMPOSE_PROFILES=seed docker compose run seed-gen
```
*Резервная копия*

#### Или продолжите использовать фразу из тестовой сети

### Создайте пустой файл peer ID

```sh filename="создать peer-id" copy
touch peer-id.json
```

Если у вас все еще есть peer-ID из тестовой сети, сначала удалите его

```sh filename="удалить старый peer-id" copy
rm peer-id.json
```


### Измените файл .env
```sh filename="изменить .env" copy
nano .env
```
Заполните его вашими данными
- ![image](https://user-images.githubusercontent.com/98658943/214577366-9b373fe5-d2c5-4d78-b86e-9038a2dea585.png)

Чтобы получить закрытый ключ, вы можете импортировать свою мнемоническую фразу в Metamask и затем просмотреть закрытый ключ оттуда. Для RPC Provider вы можете использовать Alchemy, создайте приложение Mainnet и получите оттуда RPC URL.
- ![image](https://github.com/Megumiiiiii/Sarcophagus/assets/98658943/0e9ac62c-9bf2-4b38-a3bb-5296085fa98c)


## Токен Sacro
- Чтобы получить токен, вы можете обменять его на Uniswap
- Перейдите по ссылке https://app.uniswap.org/
- Или получите награду из тестовой сети, достаточно 1000 SARCO
- SC Sarco: `0x7697B462A7c4Ff5F8b55BDBC2F4076c2aF9cF51A`

## Регистрация
```sh filename="зарегистрироваться" copy
COMPOSE_PROFILES=register docker compose run register
```
Y, Enter

### Затем введите сумму (DiggingFee от 100 до 500, CurseFee 300 и FreeBond 1000)
- ![image](https://github.com/Megumiiiiii/Sarcophagus/assets/98658943/cce8c4a4-3515-4861-8329-8ea0a451e699)



## После завершения регистрации

#### Запустите свой узел
```sh filename="запустить" copy
COMPOSE_PROFILES=service docker compose up -d
```

# ГОТОВО

## Команды 

### Проверьте, работает ли ваш узел
```sh

 filename="проверить список контейнеров" copy
docker container ls
```
Скопируйте ID контейнера с сервисами
- ![image](https://user-images.githubusercontent.com/98658943/214582956-e20e6a96-9bd0-4cfc-9244-9b6a038bf882.png)

Затем
```sh filename="проверить журналы" copy
docker logs -f ContainerIDMu
```
Правильный вывод
- ![image](https://user-images.githubusercontent.com/98658943/215103568-73db76de-ec4f-484e-9325-fc8a23ffb9d2.png)
	

### Если будут обновления в будущем
```sh filename="шаг обновления" copy
cd ~/quickstart-archaeologist
COMPOSE_PROFILES=service docker compose stop
COMPOSE_PROFILES=service docker compose pull
COMPOSE_PROFILES=service docker compose up -d
```
### Перезапустите узел (если нужно перезапустить)
```sh filename="перезапустить" copy
COMPOSE_PROFILES=service docker compose stop
COMPOSE_PROFILES=service docker compose up -d
```

### Если после регистрации вы измените домен

- Обновите Archaeologist с депозитом 1 Sacro
```sh filename="добавить 1 freebond" copy
docker compose exec -it archaeologist sh
cli update -f 1
```
```sh filename="выйти из cli" copy
exit
```

- Затем перезапустите
```sh filename="перезапустить" copy
COMPOSE_PROFILES=service docker compose restart
```


## CLI (Интерфейс командной строки)
#### Обновите Digging Fee до 300
```sh filename="обновить digging fee" copy
docker compose exec -it archaeologist sh
cli update -d 300
```
```sh filename="выйти из cli" copy
exit
```
Вы можете изменить значение на любое другое число

#### Добавьте Free Bond 100
```sh filename="обновить freebond" copy
docker compose exec -it archaeologist sh
cli update -f 100
```
```sh filename="выйти из cli" copy
exit
```
- ![image](https://user-images.githubusercontent.com/98658943/214585483-bd61c8a2-a6bc-41b5-b24f-fe73dd4cf41b.png)
	
Вы можете изменить значение

#### Просмотреть профиль
```sh filename="посмотреть профиль" copy
docker compose exec -it archaeologist sh
cli view -p
```
```sh filename="выйти из cli" copy
exit
```

#### Запросить награду
```sh filename="запросить награду" copy
docker compose exec -it archaeologist sh
cli claim
```
```sh filename="выйти из cli" copy
exit
```

#### Вывести 10 из Free Bond
```sh filename="вывести freebond" copy
docker compose exec -it archaeologist sh
cli free-bond -w 10
```
```sh filename="выйти из cli" copy
exit
```
	
### Проверка домена
Введите свое имя домена здесь: https://www.nslookup.io/website-to-ip-lookup . Если IP-адрес совпадает с IP-адресом VPS, это правильно

## ⚠️ Если вы хотите удалить узел ⚠️

```sh filename="УДАЛИТЬ" copy
cd ~/quickstart-archaeologist
COMPOSE_PROFILES=service docker compose down -v
docker rmi jwilder/nginx-proxy nginxproxy/acme-companion ghcr.io/sarcophagus-org/sarcophagus-v2-archaeologist-service
```

#