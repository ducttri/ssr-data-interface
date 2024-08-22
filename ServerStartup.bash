#!/bin/bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

cd /home/smallsat/Desktop/ssr-data-interface

npm install
npm run build
npm run start

# sudo systemctl daemon-reload 
# sudo systemctl restart detector-database.service
# journalctl -xeu detector-database.service