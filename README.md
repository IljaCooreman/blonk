### API server

### redis
data that is stored in the redis DB

hash 
"satTokens"
  <id>: <loginCode>  #UPSTAIRS:3fk3ndlfkk3n-n3lknd: [0,1,1,0,0,1,1,1]

for each connected client, a hash is created
"connectedUsers:<token>" 
  satelliteId: "<satelliteId>"
  token: "<token>"
