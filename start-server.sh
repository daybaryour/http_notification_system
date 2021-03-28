#!/bin/bash

echo "Starting Pangaea Test Application Server, You my Friend need to have redis server running"
echo "If Redis not found will attempt to download and install. Please Note Setup was completed locally on a MAC, setting might vary slightly on other environments"

test_redis() {
    exec redis-cli ping;
}

# test_this_redis = "$(test_redis)"
if [[ $(test_redis) != 'PONG' ]]; then
    echo "Redis Not Running Please Install and Start Redis Server Before Continuing"
    exit


    # :Todo Install Redis Based on OS but naah this is Out of scope right now
    # exec curl -O http://download.redis.io/redis-stable.tar.gz
    # exec tar xvzf redis-stable.tar.gz
    # cd redis-stable
    # exec make
    # exec make install
    # cd ../
fi

echo "Start Subscriber Server On Port 9000"
cd subscriber && npm install

echo "starting Publisher server on Port 8000"
cd ../publisher && npm install 

# Using PM2 to start 
cd ../ && pm2 start pm2.json
exit
