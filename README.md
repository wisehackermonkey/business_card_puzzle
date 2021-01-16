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

# build docker image
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
# TODO
- [x] add audio when you win via webaudio api
- [ ] add email me when someone wins
- [x] fail sound 
- [] sound toggle use input:checkbox
- [] fix order check issue