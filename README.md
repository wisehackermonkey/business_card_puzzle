# business_card_puzzle
 simple website that checks the solution to my business card puzzle



# change directory:
```bash
cd frontend
```

# install dependencies:
```bash
npm install
```
# run the app:
(linux)
```bash
SET DEBUG=frontend:* & npm start
```
(windows Powershell)
```bash
$env:DEBUG='frontend:*'; npm start
```

# how to run tests
```bash
npm run test
```

# docker 
## build locally
```bash
docker build -t wisehackermonkey/businesscardpuzzle .
docker push wisehackermonkey/businesscardpuzzle:latest
```
## setup
#### create a file called .env 
##### with the contents Similar to this NOTE: flags must be unique
> touch .env 
```text
FLAG1=1234567890
FLAG2=0987654321
FLAG3=1111111111
PORT=3000
``` 
## run 
```bash
docker-compose --env-file .\.env build
docker-compose --env-file .\.env up
```
## deploy (docker-compose)
```bash
git clone https://github.com/wisehackermonkey/business_card_puzzle.git
cd business_card_puzzle/
touch .env
# MODIFY THE FLAG values to match your desired values
echo "FLAG1=123456789
FLAG2=999999999
FLAG3=111111111
PORT=3000">>.env
# use the envirmental variable file you just created
docker-compose --env-file .\.env up
```
## deploy (just docker)
###### link about how env files work with docker [Environment variables in Compose | Docker Documentation](https://docs.docker.com/compose/environment-variables/) 
```bash
docker pull wisehackermonkey/businesscardpuzzle:latest
touch .env

echo "FLAG1=123456789
FLAG2=999999999
FLAG3=111111111
PORT=3000">>.env
docker run -it -p 3000:3000 --env-file ./.env wisehackermonkey/businesscardpuzzle:latest
```
# TODO
- [x] add audio when you win via webaudio api
- [ ] add email me when someone wins
- [x] fail sound 
- [] sound toggle use input:checkbox
- [] fix order check issue