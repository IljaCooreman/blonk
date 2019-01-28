### API server

### redis
data that is stored in the redis DB

hash 
"satTokens"
  <id>: <loginCode>  # e.g. UPSTAIRS:3fk3ndlfkk3n-n3lknd: [0,1,1,0,0,1,1,1]

for each connected client, a hash is created
"connectedUsers:<token>" 
  satelliteId: "<satelliteId>"
  token: "<token>"



### API endpoints
on port 9000.

## POST /auth
Content-Type: application/json
body {
  entryCode: [0,0,0,0,1,0,1,1,0]
}
returns an entry token which can be used to authorize in further requests:
{
    "group": "default",
    "satelliteId": "default:14cdc886-3694-4d0e-958e-ced193422acb",
    "token": "09908dfb-1629-44b0-872a-accce50d17b9"
}

## GET /connectedUsers
Authorization: <token>
returns a list of connected user id's
[
    "bb291654-62cc-4779-a69c-22df8669c2b3",
    "0147b87d-afea-412a-bc8b-8faf65e3e2e6",
    "dc54a410-70ed-4a31-a271-1d3b59a81fc0",
]

## GET /connectedUsers/<token>
Authorization: <token>
returns:
{
    "token": "f8ce585f-347a-4cee-bc2b-8776fc4b3a01",
    "satelliteId": "default:14cdc886-3694-4d0e-958e-ced193422acb",
    "group": "default",
    "wsServerId": ""
}