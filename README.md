# http_notification_system
HTTP notification system. A server (or set of servers) will keep track of topics -> subscribers where a topic is a string and a subscriber is an HTTP endpoint. When a message is published on a topic, it should be forwarded to all subscriber endpoints.

# Application Was Build With NodeJs

# Pre Requisites

#### Redis Server -- Project was built using Redis Version 6.2.1 [Click Here to Download Redis] (https://redis.io/download)
#### Node and NPM (Of course it is a node project) -- 
#### PM2 Installed Globally -- This is to enable our shell script start on multiple servers at once -- npm install -g pm2


# Installation
- Start Your Redis Server ``` redis-server ```
- Ensure PM2 is installed globally ``` pm2 status ```
- Clone This Project to your local machine (git clone)
- run ``` cd http_notification_system && chmod +x start-server.sh && ./start-server.sh ```


##### Have Fun
