<div align="center">

# Sarcophagus

</div>

---

![image](https://user-images.githubusercontent.com/98658943/214569281-4d9d3e0e-f1c5-4933-8559-07576ef885d7.png)

## Minimum Specifications
> 10GB SSD
> 1GB RAM

## Domain
This setup requires a personal domain such as .com, .net, .id, etc. You can purchase it from Namecheap, Niagahoster, Contabo, or anywhere you prefer.

### After purchasing
- Go to the domain management (here, we use Niagahoster).
- Add DNS Records.
- ![image](https://user-images.githubusercontent.com/98658943/214573355-e3f22b37-639c-4824-9024-11db2b05f96b.jpg)

- Select *A*.
- ![image](https://user-images.githubusercontent.com/98658943/214574697-114cc2de-bb50-4ef0-885f-2bb0d6c37c8f.jpg)

- Enter the name and VPS IP.
- ![image](https://user-images.githubusercontent.com/98658943/214574980-6d5b28<a.9556c6-b6bf-66edf3e027bd.jpg)

- Save.

## Install all necessary tools
```sh filename="update system" copy
sudo apt update; sudo apt upgrade
```
```sh filename="install Docker and others" copy
sudo apt-get update && sudo apt install jq git && sudo apt install apt-transport-https ca-certificates curl software-properties-common -y && curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add - && sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable" && sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

## Open ports
```sh filename="ports" copy
sudo ufw allow ssh; sudo ufw allow 443/tcp; sudo ufw allow 80/tcp; sudo ufw enable
```

## Clone the Repository
```sh filename="clone" copy
git clone https://github.com/sarcophagus-org/quickstart-archaeologist
cd quickstart-archaeologist
```

## Getting Started
### Create the `.env` File
```sh filename="create .env" copy
cp .env.example .env
```

### Generate a Mnemonic Phrase
```sh filename="generate a new phrase" copy
COMPOSE_PROFILES=seed docker compose run seed-gen
```
*BACKUP*

#### Or continue using the phrase from the testnet

### Create a blank peer ID file
```sh filename="create peer-id" copy
touch peer-id.json
```

If there is still a peer-ID from the testnet, delete it first.

```sh filename="delete old peer-id" copy
rm peer-id.json
```

### Edit the .env File
```sh filename="edit .env" copy
nano .env
```
Fill it with your data.
- ![image](https://user-images.githubusercontent.com/98658943/214577366-9b373fe5-d2c5-4d78-b86e-9038a2dea585.png)

To obtain the Private Key, you can import the Mnemonic into Metamask and then view the Private Key from there. And for the RPC Provider, you can use Alchemy; please create an APP for Mainnet and obtain the RPC URL from there.
- ![image](https://github.com/Megumiiiiii/Sarcophagus/assets/98658943/0e9ac62c-9bf2-4b38-a3bb-5296085fa98c)


## Sacro Token
- To obtain Sacro Tokens, you can swap them on Uniswap.
- Go to https://app.uniswap.org/
- Or receive rewards from the testnet, 1000 SARCO should be sufficient.
- SARCO SC: `0x7697B462A7c4Ff5F8b55BDBC2F4076c2aF9cF51A`

## Register
```sh filename="compose register" copy
COMPOSE_PROFILES=register docker compose run register
```
Press Y, then Enter.

### Then enter the amount (DiggingFee 100 - 500, CurseFee 300, and FreeBond 1000)
- ![image](https://github.com/Megumiiiiii/Sarcophagus/assets/98658943/cce8c4a4-3515-4861-8329-8ea0a451e699)



## After Registering

#### Start the Node
```sh filename="compose up" copy
COMPOSE_PROFILES=service docker compose up -d
```

# DONE

## Commands 

### Check if the node is running
```sh filename="check container list" copy
docker container ls
```
Copy the ID of the container that contains the services.
- ![image](https://user-images.githubusercontent.com/98658943/214582956-e20e6a96-9bd0-4cfc-9244-9b6a038bf882.png)

Then check the logs.
```sh filename="check logs" copy
docker logs -f YourContainerID
```
The correct output should look like this:
- ![image](https://user-images.githubusercontent.com/98658943/215103568-73db76de-ec4f-484e-9325-fc8a23ffb9d2.png)
	

### If there are updates in the future
```sh filename="update steps" copy
cd ~/quickstart-archaeologist
COMPOSE_PROFILES=service docker compose stop
COMPOSE_PROFILES=service docker compose pull
COMPOSE_PROFILES=service docker compose up -d
```
### Restart Node (If you want to restart)
```sh filename="restart" copy
COMPOSE_PROFILES=service docker compose stop
COMPOSE_PROFILES=service docker compose up -d
```

### If you want to change the domain after registering

- Update Archaeologist with a deposit of 1 Sacro.
```sh filename="add 1 freebond" copy


docker compose exec -it archaeologist sh
cli update -f 1
```
```sh filename="exit cli" copy
exit
```

- Then restart.
```sh filename="restart" copy
COMPOSE_PROFILES=service docker compose restart
```


## CLI (Command Line Interface)
#### Update Digging Fee to 300
```sh filename="update digging fee" copy
docker compose exec -it archaeologist sh
cli update -d 300
```
```sh filename="exit cli" copy
exit
```
You can change 300 to any desired value.

#### Add 100 to Free Bond
```sh filename="update freebond" copy
docker compose exec -it archaeologist sh
cli update -f 100
```
```sh filename="exit cli" copy
exit
```
You can change 100 to any desired value.

#### View Profile
```sh filename="view profile" copy
docker compose exec -it archaeologist sh
cli view -p
```
```sh filename="exit cli" copy
exit
```

#### Claim Rewards
```sh filename="claim reward" copy
docker compose exec -it archaeologist sh
cli claim
```
```sh filename="exit cli" copy
exit
```

#### Withdraw 10 from Free Bond
```sh filename="withdraw freebond" copy
docker compose exec -it archaeologist sh
cli free-bond -w 10
```
```sh filename="exit cli" copy
exit
```

### Check Domain
Enter your domain name here https://www.nslookup.io/website-to-ip-lookup. If it matches the VPS IP, then it's correct.

## ⚠️ If you want to delete the node ⚠️

```sh filename="DELETE" copy
cd ~/quickstart-archaeologist
COMPOSE_PROFILES=service docker compose down -v
docker rmi jwilder/nginx-proxy nginxproxy/acme-companion ghcr.io/sarcophagus-org/sarcophagus-v2-archaeologist-service
```

#
