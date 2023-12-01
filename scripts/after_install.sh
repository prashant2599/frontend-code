#!/bin/bash

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
. /.nvm/nvm.sh
nvm install v18
export NVM_DIR="/.nvm"	
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"	
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
cd /var/www/html/medflick2
sudo chown www-data:www-data -R /var/www/html/medflick2/
sudo chmod 777 -R /var/www/html/medflick2/
npm install
sudo chown www-data:www-data -R /var/www/html/medflick2/.*
sudo chmod 777 -R /var/www/html/medflick2/.*
npm run build
sudo chown www-data:www-data -R /var/www/html/medflick2/.*
sudo chmod 777 -R /var/www/html/medflick2/.*
npm install -g pm2
pm2 delete app1
pm2 start npm --name app1 -- run start -- -p 3000